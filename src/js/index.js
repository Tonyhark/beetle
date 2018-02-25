$(function () {
	// 3特性及配置
	var $featureOne = $('#J_feature_one');
	var $featureTwo = $('#J_feature_two');
	var $featureTwoText = $('#J_feature_two_text');
	var $featureThree = $('#J_feature_three');
	var $carConfig = $('#J_car_config');
	var $carConfigDetail = $('#J_car_config_detail');
	$featureOne.hover(function () {
		$featureOne.css({
			zIndex: 4
		})
		$featureOne.animate({
			left: 0
		}, 350);
	}, function () {
		$featureOne.animate({
			left: -475
		}, 350, function () {
			$featureOne.css({
				zIndex: 1
			})
		});
	})

	$featureTwo.hover(
		function () {
			$featureTwo.css({
				zIndex: 3
			})
			$featureTwoText.animate({
				top: 255
			}, 350);
		},
		function () {
			$featureTwoText.animate({
				top: 515
			}, 350, function () {
				$featureTwo.css({
					zIndex: 1
				})
			});
		}
	)

	$featureThree.hover(function () {
		$featureThree.css({
			zIndex: 3
		})
		$featureThree.animate({
			top: 0
		}, 350);
	}, function () {
		$featureThree.animate({
			top: 255
		}, 350, function () {
			$featureThree.css({
				zIndex: 1
			})
		});
	})

	$carConfig.click(function () {
		$carConfigDetail.toggle()
	})

	// 底部表单
	var $mask = $('#J_pop_mask') // 黑色半透明蒙层
	var $popTerms = $('#J_pop_terms') //条款弹框
	var $popSubmitSuccess = $('#J_pop_sumbit_suc') //试驾提交成功

	$('#J_trial_submit').click(function () {
		$mask.show()
		$popSubmitSuccess.show()
	})
	$('#J_terms').click(function () {
		$mask.show()
		$popTerms.show()
	})

	$('#J_pop_sumbit_suc_close').click(function () {
		$popSubmitSuccess.hide()
		$mask.hide()
	})

	$('#J_pop_terms_close').click(function () {
		$popTerms.hide()
		$mask.hide()
	})


	// 分享弹框
	var $wechatShare = $('#J_wechat_share')
	$('#J_icon_wechat').click(function () {
		console.log(111)
		$wechatShare.toggle()
	})
	$('#J_share_code_close').click(function () {
		$wechatShare.hide()
	})

	// 导航
	var $naviLinks = $('.navi-link')
	var activeClsName = 'cur'
	var canRemoveCur = true
	var t
	$naviLinks.click(function () {
		var $this = $(this)
		clearTimeout(t)
		canRemoveCur = false
		if ($this.hasClass(activeClsName)) return
		var index = $this.index()
		var posY = 0
		if (index === 0) {
			posY = 0
		} else if (index === 1) {
			posY = $('#J_second_screen').offset().top
		} else if (index === 2) {
			posY = $('#J_third_screen').offset().top - 55
		}
		window.scrollTo(0, posY)
		t = setTimeout(() => {
			canRemoveCur = true
		}, 2000);
		$this.addClass(activeClsName).siblings().removeClass(activeClsName)
	})
	$(window).scroll(throttle(function() {
		console.log('scorll')
		if(!canRemoveCur) return
		$naviLinks.removeClass(activeClsName)
	}, 1500))
})

function throttle (fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
    deferTimer;
  return function () {
    var context = scope || this;
    var now = +new Date,
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
