'use strict';

// 绑定事件
// header事件
mui('.mui-bar').on('tap', '#mbtn', function () {
    mui('.mui-off-canvas-wrap').offCanvas('toggle');
});
mui('.mui-bar').on('tap', "#dj", function () {
    var btnArray = ['拨打', '取消'];
    var phone = "12315";
    mui.confirm('' + phone + '', '打假电话', btnArray, function (e) {
        if (e.index == 0) {
            plus.device.dial(phone, false);
        }
    });
});
// tabbar事件
mui('.sjbg').on('tap', '#alertBtn', function () {
    mui.alert('搜索"天津塘沽一阀"', '欢迎关注公众号', function () {});
});
mui('.sjbg').on('tap', '#telephone', function () {
    var btnArray = ['拨打', '取消'];
    var phone = "13821111191";
    mui.confirm('' + phone + '', '客服电话', btnArray, function (e) {
        if (e.index == 0) {
            plus.device.dial(phone, false);
        }
    });
});
mui('#liuyan')[0].addEventListener('tap', function () {
    mui.openWindow({
        url: 'subpage/kf.html',
        id: 'subpage/kf.html',
        styles: {
            popGesture: 'close' // 'hide', 'close','none' 此处是关键
        }
    });
});
// 首页1
mui('#qyjj')[0].addEventListener('tap', function () {
    mui.openWindow({
        url: 'my/company_profile.html',
        id: 'my/company_profile.html',
        styles: {
            popGesture: 'close' // 'hide', 'close','none' 此处是关键
        }
    });
});
mui('#dlwz')[0].addEventListener('tap', function () {
    mui.openWindow({
        url: 'my/map.html',
        id: 'my/map.html',
        styles: {
            popGesture: 'close' // 'hide', 'close','none' 此处是关键
        }
    });
});
mui('#gytgyf')[0].addEventListener('tap', function () {
    mui.openWindow({
        url: 'my/regard.html',
        id: 'my/regard.html',
        styles: {
            popGesture: 'close' // 'hide', 'close','none' 此处是关键
        }
    });
});
mui('#a1')[0].addEventListener('tap', function () {
    mui.openWindow({
        url: 'subpage/league.html',
        id: 'subpage/league.html',
        styles: {
            popGesture: 'close' // 'hide', 'close','none' 此处是关键
        }
    });
});
// 首页2
// 导航
mui('#tit').on('tap', 'span', function () {
    var i = $(this).index();
    if (i == 0) {
        $('.sjbg').show();
    } else {
        $('.sjbg').hide();
    }
    $(this).addClass('select').siblings().removeClass('select');
    $('#con>div').eq(i).show().siblings().hide();

    // 获取产品列表
    $.ajax({
        url: pre_url + '&op=get_product', //获取文章数据 可带参数 pagesize:分页大小,p:页码
        type: 'post',
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            pagesize: propagesize,
            p: propage
        },
        success: function success(mes) {
            console.log(mes);
        }
    });
});
// 搜索框
mui('.cp-header').on('tap', '.suo', function () {

    $(".ss_1").fadeToggle(0);
    var h = $('.cp-header').outerHeight();
    console.log(h);
    $('.view-cell2').animate({
        top: h
    });
});

// 产品
mui('.leftimg').on('tap', 'img', function () {
    mui.openWindow({
        url: 'subpage/ub.html', id: 'subpage/ub.html',
        styles: {
            popGesture: 'close' // 'hide', 'close','none' 此处是关键
        }
    });
});
mui('.rightimg').on('tap', 'img', function () {
    mui.openWindow({
        url: 'subpage/ub.html', id: 'subpage/ub.html',
        styles: {
            popGesture: 'close' // 'hide', 'close','none' 此处是关键
        }
    });
});