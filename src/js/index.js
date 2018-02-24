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

	$carConfig.click(function() {
		$carConfigDetail.toggle()
	})

	// 底部表单
	var $mask = $('#J_pop_mask') // 黑色半透明蒙层
	var $popTerms = $('#J_pop_terms') //条款弹框
	var $popSubmitSuccess = $('#J_pop_sumbit_suc') //试驾提交成功

	$('#J_trial_submit').click(function() {
		$mask.show()
		$popSubmitSuccess.show()
	})
	$('#J_terms').click(function () {
		$mask.show()
		$popTerms.show()
	})

	$('#J_pop_sumbit_suc_close').click(function() {
		$popSubmitSuccess.hide()
		$mask.hide()
	})

	$('#J_pop_terms_close').click(function() {
		$popTerms.hide()
		$mask.hide()
	})

})


