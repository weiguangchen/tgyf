/**
 * 
 * 鐗堟潈鎵€鏈�   peyton  
 * 寮€鍙戣€咃細peyton
 * QQ:625506370@QQ.COM
 * 
 **/
(function ($) {
	/*
	 * 鎻掍欢鍚嶇О鏄痮verTexts 
	 * 寮€鍙戣€咃細peyton
	 * QQ:625506370@QQ.COM
	 * 浣跨敤鏂规硶锛�1. $("you Dom ClassName or ID").overTexts({ texts:"you need overhide text...." });//杩欑鐨勫垵濮嬬殑锛屼笉甯﹀弬鏁扮殑锛岄粯璁ゅ弬鏁版槸 20瀛楅暱 涓旀樉绀哄睍寮€鍜屾敹璧风殑
	 * texts: "娴嬭瘯鏂囨湰...姝ゅ鐪佺暐200瀛�...娴嬭瘯鏂囨湰",
	 * textLength: "20", //浣犻渶瑕佸畾涔夎秴杩囧灏戝瓧锛屽氨鏄剧ず鏀惰捣
	 * overText: "灞曞紑",  //浣犻渶瑕佽缃殑榛樿鍚嶇О锛屽睍寮€ 鏄剧ず
	 * openText: "鏀惰捣",  //浣犻渶瑕佽缃殑榛樿鍚嶇О锛屾敹璧� 鏀剁缉
	 * ooType: "2" //灞曞紑鍜屾敹缂╃殑绫诲瀷锛� 0 涓嶆樉绀哄睍寮€鍜屾敹缂╋紝浠呬负鐪佺暐鍙� || 1 鏄剧ず灞曞紑锛屼笉鏄剧ず鏀剁缉 ||2 鏄剧ず灞曞紑鍜屾敹缂� || 3鏄剧ず鐪佺暐鍙�
	 * 
	 * */
	$.fn.overTexts = function (options) {
		var ooText, t1;
		var dft = {
			//鍒濆鍖栫殑鍙傛暟閰嶇疆
			texts: "灞曞紑鍜屾敹缂╃殑绫诲瀷锛� 0 涓嶆樉绀哄睍寮€鍜屾敹缂╋紝浠呬负鐪佺暐鍙� || 1 鏄剧ず灞曞紑锛屼笉鏄剧ず鏀剁缉 ||2 鏄剧ず灞曞紑鍜屾敹缂�",
			textLength: "20",
			overText: "灞曞紑",
			openText: "鏀惰捣",
			ooType: "2" //灞曞紑鍜屾敹缂╃殑绫诲瀷锛� 0 涓嶆樉绀哄睍寮€鍜屾敹缂╋紝浠呬负鐪佺暐鍙� || 1 鏄剧ず灞曞紑锛屼笉鏄剧ず鏀剁缉 ||2 鏄剧ず灞曞紑鍜屾敹缂� || 3鏄剧ず鐪佺暐鍙�
		}
		var opt = $.extend(dft, options);
		ooText = opt.texts;			//涓存椂瑁呰浇 鏁版嵁 鐢ㄤ簬濉厖鍒癲ata-text鍐呯殑
		if (options.ooType == '0') {
			$(this).html("<div class='moreText' data-text=" + opt.texts + ">" + opt.texts + "</div>");
		}
		if (options.ooType == '1') {
			ooText = opt.texts;
			if (opt.texts.length > opt.textLength) {
				t1 = opt.texts.substring(0, opt.textLength) + "<a class='moreoh'   >" + opt.overText + "</a>";
			} else {
				t1 = opt.texts;
			}
			$(this).html("<div class='moreText' data-text=" + ooText + ">" + t1 + "</div>");
		}
		if (options.ooType == '2') {
			if (opt.texts.length > opt.textLength) {
				t1 = opt.texts.substring(0, opt.textLength) + "<a class='moreoh' >" + opt.overText + "</a>";
			} else {
				t1 = opt.texts;
			}

		}
		if (options.ooType == '3') {
			if (opt.texts.length > opt.textLength) {
				t1 = opt.texts.substring(0, opt.textLength) + "...";
			} else {
				t1 = opt.texts;
			}

		}
		//鏃犺浣曠缁撴灉锛屽潎鎵ц姝�
		$(this).html("<div class='moreText' data-text=" + ooText + ">" + t1 + "</div>");
		//姝ゅ鍒ゆ柇 灏辨槸 宸茬粡鏈夊睍寮€鎴栬€呮敹璧蜂簡
		if ($(this).find("a").hasClass("moreoh")) {
			//浜嬩欢濮旀墭锛岃浠栧彲浠ユ墽琛�
			$(".moreText").on("click", "a.moreoh", function () {//鏇村鎴栬€呮敹璧风殑鐐瑰嚮浜嬩欢
				var moreoh = $(this).find("a.moreoh");//鎴戞槸鏇村鎴栬€呮敹璧风殑dom
				if (moreoh.context.innerText == opt.overText) {//濡傛灉鎴戞鏃舵槸灞曞紑
					if (opt.ooType == 2) {
						t1 = opt.texts + "<a class='moreoh' >" + opt.openText + "</a>";
						moreoh.context.innerText = opt.openText;
						$(this).parents(".moreText").html(t1);
					} else {
						t1 = opt.texts;
						$(this).parents(".moreText").html(t1);
					}

				}
				if (moreoh.context.innerText == opt.openText) {//濡傛灉鎴戞鏃舵槸鏀惰捣
					t1 = opt.texts.substring(0, opt.textLength) + "<a class='moreoh'    >" + opt.overText + "</a>";
					moreoh.context.innerText = opt.overText;
					$(this).parents(".moreText").html(t1);
				}
			});
		}

	}
})(jQuery);