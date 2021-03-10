$(document).ready(function () {

	$('#start').click(function () {
		$('#home').hide();
		$('#questions').show();
		$('html, body').animate({
			scrollTop: $("#questions").offset().top - 100
		}, 1500);
	});

	$('input:radio').click(function () {
		$(this).parent().parent().parent().find('.radio-buttons').removeClass('active');
		$(this).parent('.radio-buttons').addClass('active');
	});

	$('select').change(function () {
		$(this).addClass('active');
	});

	$('#pounds').change(function () {
		$('html, body').animate({
			scrollTop: $("#question-2-options").offset().top - 100
		}, 1500);
	});

	$('input[name="sunlight"]').change(function () {
		$('html, body').animate({
			scrollTop: $("#question-3-options").offset().top - 100
		}, 1500);
	});

	$('#main-form').submit(function (e) {
		e.preventDefault();
		var stones = parseInt($('#stones').val());
		var lbs = parseInt($('#pounds').val());

		var totalpounds = stones * 14 + lbs;

		var sunlight = $('input[name="sunlight"]:checked').val();

		var exposure = parseInt($('input[name="exposure"]:checked').val());

		//validate sunlight and exposure
		if (!$('input[name="sunlight"]').is(':checked')) {
			$('.error').hide();
			$("#question-2-options").prev().show();
			$('html, body').animate({
				scrollTop: $("#question-2-options").offset().top - 200
			}, 1500);
		}
		else if (!$('input[name="exposure"]').is(':checked')) {
			$('.error').hide();
			$("#question-3-options").prev().show();
			$('html, body').animate({
				scrollTop: $("#question-3-options").offset().top - 200
			}, 1500);
		}
		//if both are valid
		else {
			$('.error').hide();
			if ($('input[name="sunlight"]:checked').val() == 'less') {
				var iu = (totalpounds * 27);
			}
			else if ($('input[name="sunlight"]:checked').val() == 'more') {
				var base = totalpounds * 27;
				//double exposure, find percentage in decimals
				var exposurepercentage = (exposure * 2) / 100;
				//reduce the pencentage base from the orginal base value
				var iu = base - (base * exposurepercentage);
			}

			$('#questions').hide();
			$('#results').show();
			$('html, body').animate({
				scrollTop: 0
			}, 1500);

			if (iu < 1) {
				$('#iu').parent().html("You got enough vitamin D from sun exposure so you don’t need any more from your diet, however it’s important to remember too much sun exposure on skin can be damaging and that you should always wear sunscreen.");
				$('#efficient').hide();
			}
			else {
				$('#results-main h4').html('You need <span id="iu" class="yellow-text"></span> IU / <span id="ug" class="yellow-text"></span> ug of <br>vitamin D each day.');

				if (iu.countDecimals() > 2) {
					$('#iu').html(iu.toFixed(2));
				}
				else {
					$('#iu').html(iu);
				}

				$('#ug').html(iu * 0.025);

				$('#efficient').show();

				$('#salmon').html(parseInt(iu / 716));
				$('#tuna').html(parseInt(iu / 228));
				$('#milk').html(parseInt(iu / 128));
				$('#soymilk').html(parseInt(iu / 116));
				$('#almondmilk').html(parseInt(iu / 96));
				$('#chocomilk').html(parseInt(iu / 112));
				$('#juice').html(parseInt(iu / 100));
				$('#mushrooms').html(parseInt(iu / 316));
				$('#pork').html(parseInt(iu / 80));
				$('#eggs').html(parseInt(iu / 44));

				$('.yellow-text').each(function () {
					if ($(this).html() == 0) {
						var id = $(this).attr('id');
						$('#' + id).parent().hide();
					}
				});
			}
		}
	});

	$('#start-again').click(function () {
		$('#stones').val('');
		$('#pounds').val('');
		$(':checkbox, :radio').prop('checked', false);
		$('.active').removeClass('active');
		$('#results').hide();
		$('#questions').show();
		$('html, body').animate({
			scrollTop: $("#questions").offset().top - 100
		}, 1500);
	});

	Number.prototype.countDecimals = function () {
		if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
		return this.toString().split(".")[1].length || 0;
	}
});