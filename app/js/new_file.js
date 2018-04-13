/* simpler-sidebar v1.2.0 (http://dcdeiv.github.io/simpler-sidebar)
 * Copyright 2015-2015 and licensed under GPLv2 (https://github.com/dcdeiv/simpler-sidebar/blob/master/LICENSE)
 */
! function(a) {
	a.fn.simplerSidebar = function(b) {
		var c = a.extend(!0, a.fn.simplerSidebar.settings, b);
		return this.each(function() {
			var b, d, e, f, g, h, i = c.attr,
				j = a(this),
				k = a(c.opener),
				l = a(c.sidebar.closingLinks),
				m = c.animation.duration,
				n = c.sidebar.width,
				o = c.sidebar.gap,
				p = n + o,
				q = a(window).width(),
				r = {},
				s = {},
				t = function() {
					a("body, html").css("overflow", "hidden")
				},
				u = function() {
					a("body, html").css("overflow", "auto")
				},
				v = {
					duration: m,
					easing: c.animation.easing,
					complete: t
				},
				w = {
					duration: m,
					easing: c.animation.easing,
					complete: u
				},
				x = a("<div>").attr("data-" + i, "mask");
			"right" === c.sidebar.align ? b = "right" : "left" === c.sidebar.align && (b = "left"), d = p > q ? q - o : n, e = {
				position: "fixed",
				top: c.top,
				bottom: 0,
				width: d
			}, e[b] = -d, r[b] = 0, f = a.extend(!0, e, c.sidebar.css), j.css(f).attr("data-" + i, "disabled"), g = {
				position: "fixed",
				top: c.top,
				right: 0,
				bottom: 0,
				left: 0,
				zIndex: c.sidebar.css.zIndex - 1,
				display: "none"
			}, h = a.extend(!0, g, c.mask.css), !0 === c.mask.display && x.appendTo("body").css(h), k.click(function() {
				var a = j.attr("data-" + i),
					c = j.width();
				s[b] = -c, "disabled" === a ? (j.animate(r, v).attr("data-" + i, "active"), x.fadeIn(m)) : "active" === a && (j.animate(s, w).attr("data-" + i, "disabled"), x.fadeOut(m))
			}), x.click(function() {
				var a = j.attr("data-" + i),
					c = j.width();
				s[b] = -c, "active" === a && (j.animate(s, w).attr("data-" + i, "disabled"), x.fadeOut(m))
			}), j.on("click", l, function() {
				var a = j.attr("data-" + i),
					c = j.width();
				s[b] = -c, "active" === a && (j.animate(s, w).attr("data-" + i, "disabled"), x.fadeOut(m))
			}), a(window).resize(function() {
				var c, d, e = a(window).width();
				c = p > e ? e - o : n, d = {
					width: c
				}, d[b] = -c, j.attr("data-" + i, "disabled").css(d), x.fadeOut(m), a("body, html").css({
					overflow: "auto"
				})
			})
		})
	}, a.fn.simplerSidebar.settings = {
		attr: "simplersidebar",
		top: 0,
		animation: {
			duration: 500,
			easing: "swing"
		},
		sidebar: {
			width: 350,
			gap: 64,
			closingLinks: "a",
			css: {
				zIndex: 3e3
			}
		},
		mask: {
			display: !0,
			css: {
				backgroundColor: "black",
				opacity: .5,
				filter: "Alpha(opacity=50)"
			}
		}
	}
}(jQuery);