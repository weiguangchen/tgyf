var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var assetRev = require('gulp-asset-rev');
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var babel = require('gulp-babel');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-uglify');
var rename = require('gulp-rename');
var contentIncluder = require('gulp-content-includer');
var plumber = require('gulp-plumber');

var bs = require('browser-sync').create();
var reload = bs.reload;
// 目录地址
var app = './app';
var build = './build';
var dist = './dist';
var cssSrc = './app/css/css/';
var scssSrc = './src/scss/**/*.scss';
var esSrc = './src/js/**/*.js';
var jsSrc = './app/js/js/';
var templateSrc = './src/template/**/*.html';
// 替换资源版本号后的html
var htmlrev = dist + '/view';
var images = app + '/images/**/*.img';

// 开启本地服务器
gulp.task('serve', ['postcss', 'es6', 'template'], function () {
    bs.init({
        server: './app'
    })
    gulp.watch(scssSrc, ['postcss']);
    gulp.watch('./src/js/**/*.js', ['es6']);
    // gulp.watch(html, ['template']);
    gulp.watch(templateSrc, ['template']);
    gulp.watch(templateSrc).on('change', reload);
})

// 合并template模板
gulp.task('template', function () {
    return gulp.src(templateSrc)
        .pipe(contentIncluder({
            includerReg: /<include\s+"([^"]+)">/g
        }))
        .pipe(gulp.dest('./app/subpage'))
        .pipe(reload({ stream: true }));
})

// 编译scss
gulp.task('postcss', function () {
    return gulp.src(scssSrc)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        })]))
        // .pipe(gulp.dest(build + '/css'))
        .pipe(gulp.dest(cssSrc))
        .pipe(reload({ stream: true }));
});

// 编译es6
gulp.task('es6', () => {
    return gulp.src(esSrc)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(jsSrc))
        .pipe(reload({ stream: true }));
})


//为css中引入的图片/字体等添加hash编码
gulp.task('assetRev', function () {
    return gulp.src(cssSrc)  //该任务针对的文件
        .pipe(assetRev()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //编译后的路径
});
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function () {
    return gulp.src('./build/css/*.css')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css'));
});
// 压缩css
gulp.task('cssmin', function () {
    return gulp.src('./build/css/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist + '/css'));
})
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function () {
    return gulp.src('./build/js/*.js')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/js'));
});
// 压缩js
gulp.task('jsmin', function () {
    return gulp.src('./build/js/*.js')
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist + '/js'));
})
//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['./rev/**/*.json', html])
        .pipe(revCollector())
        .pipe(gulp.dest(htmlrev));
});

//开发构建
gulp.task('dist', function (done) {
    condition = false;
    runSequence(    //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
        // ['assetRev'],
        // ['es6'],
        ['postcss'],
        ['cssmin'],
        ['jsmin'],
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        done);
});


gulp.task('default', ['serve']);