$(function(){

	pref=$('.wrap').data('pref');

	$('.lbox').fancybox({
		padding: 0,
		openEffect : 'elastic',
		openSpeed  : 150,
		closeEffect : 'elastic',
		closeSpeed  : 150,
		closeClick : true,
		helpers : {
			overlay : null
		}
	});

	$('.chkbx_el').click(function() {
		if($(this).hasClass('chkbx_el--active')) {
			$(this).removeClass('chkbx_el--active');
		} else {
			$(this).addClass('chkbx_el--active');
		}	
	});

	$('.num_only').on("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
    }
	});
	
	$('.rdbtn_el').click(function() {
		prnt=$(this).parent('div.rdbtn');
		if(!$(this).hasClass('rdbtn_el--active')) {
			prnt.find('.rdbtn_el').removeClass('rdbtn_el--active');
			$(this).addClass('rdbtn_el--active');
		}
	});

	if($('#map').length>0) {
	 	
	 	ymaps.ready(init);			
		var myMap, myPlacemark, myPlacemark2, myPlacemark3;	
		function init () {
			var myMap = new ymaps.Map("map", {
				center: [53.240153109688556,34.40725348437497],
				zoom: 11,
				controls: ['zoomControl']
			}, {
				searchControlProvider: 'yandex#search'
			});
			myPlacemark = new ymaps.Placemark([53.26296589194449,34.35689104232781]);
			myMap.geoObjects.add(myPlacemark);		
			myPlacemark2 = new ymaps.Placemark([53.25085207117256,34.445674999999966]);
			myMap.geoObjects.add(myPlacemark2);		
			myPlacemark3 = new ymaps.Placemark([53.21179457121677,34.43573949999993]);
			myMap.geoObjects.add(myPlacemark3);		
			myMap.behaviors.disable('scrollZoom');

			/*$('.block2_classes__body__el').find('h3').click(function() {
				prnt=$(this).parents('div.block2_classes__body__el');
				setCenter(prnt.data('coord'),11);
			});*/

			$('.block2_classes__body__el').hover(
			  function() {
			    setCenter($(this).data('coord'),15);
			  }, function() {
			    setCenter($('#block2_classes__body').data('coord'),11);
			  }
			);

			$('.block2_classes__body__el2').hover(
			  function() {
			    setCenter($(this).data('coord'),15);
			  }, function() {
			    setCenter($('#block2_classes__body2').data('coord'),11);
			  }
			);

			function setCenter (coord,zm) {
	    	myMap.setCenter(coord, zm);
	    }
		}
	}

	var intervalID;
	if($('.dynamic').length>0) {
		intervalID=setInterval(function(){
			auto();
		}, 8000);

		function auto() {
			t_id=$('.slider_body__info__nav--active').attr('id');
			f_id=$('#slider_body__info__nav li').first().attr('id');
			l_id=$('#slider_body__info__nav li').last().attr('id');
			if(t_id==l_id) {
				n_id=f_id;
			} else {
				n_id=$('.slider_body__info__nav--active').next('li').attr('id');
			}
			rotate(t_id,n_id);
		}

		function rotate(t,n) {
			$('#img_'+t).animate({opacity: '0'}, 800);
			$('#img_'+n).animate({opacity: '1'}, 800);
			$('.slider_img__el').removeClass('slider_img__el--active');
			$('#img_'+n).addClass('slider_img__el--active');

			$('#info_'+t).animate({opacity: '0'}, 800);
			$('#info_'+n).animate({opacity: '1'}, 800);
			$('.slider_body__info__el').removeClass('slider_body__info__el--active');
			$('#info_'+n).addClass('slider_body__info__el--active');

			$('#slider_body__info__nav li').removeClass('slider_body__info__nav--active');
			$('#'+n).addClass('slider_body__info__nav--active');
		}

		$('#slider_body__info__nav li').click(function() {
			if($(this).hasClass('slider_body__info__nav--active')) {

			} else {
				clearInterval(intervalID);
				t_id=$('.slider_body__info__nav--active').attr('id');
				n_id=$(this).attr('id');
				rotate(t_id,n_id);
			}
		});

	}

	$('#inner_text__body__side--top').click(function() {
		ths=$(this);
		if($('#inner_text__body__side').hasClass('inner_text__body__side--open')) {
			$('#inner_text__body__side').removeClass('inner_text__body__side--open');
			ths.find('a').html('Показать меню');
		} else {
			$('#inner_text__body__side').addClass('inner_text__body__side--open');
			ths.find('a').html('Скрыть меню');
		}
	});

	function modal_close() {
		$.fancybox.close();
		$('#mdl').html('');
	}

	$('.mc').live('click', function() {
		modal_close();
	});

	function modal_open() {
		$.fancybox({
			padding: 0,
			openEffect : 'fade',
			openSpeed  : 200,
			closeEffect : 'fade',
			closeSpeed  : 200,
			closeClick : false,
			href : '#mdl'
		});	
	}

	function createAssociativeArray(arr1, arr2) {
		var arr = {};
		for(var i = 0, ii = arr1.length; i<ii; i++) {
			arr[arr1[i]] = arr2[i];
		}
		return arr;
	}

	$('#class_check__wrp--select').click(function() {
		if($('#class_check__wrp').hasClass('class_check__wrp--open')) {
			$('#class_check__wrp').removeClass('class_check__wrp--open')
		} else {
			$('#class_check__wrp').addClass('class_check__wrp--open')
		}	
	});

	$('#class_check li').click(function() {
		if($(this).hasClass('class_check--active')) {
			$('#class_check__wrp').removeClass('class_check__wrp--open')
		} else {
			$('#class_check li').removeClass('class_check--active');
			$(this).addClass('class_check--active');
			$('#class_check__wrp--select').html($(this).find('span').html());
			$('#class_check__wrp--map').html($(this).data('addr'));
			$('#class_check__wrp').removeClass('class_check__wrp--open')
		}
	});

	$('#class_check__wrp--map').click(function() {
		coord=$('.class_check--active').data('coord');
		$('#mdl').html('<div class="txt"><h3 style="text-align: center;">'+$('.class_check--active').find('span').html()+', '+$('.class_check--active').data('addr')+'</h3></div><div id="map2"></div><div class="align_center"><div class="align_center_to_left"><div class="align_center_to_right"><button class="btn call" data-reg="'+$('#class_check__wrp--select').text()+'" id="mdl_req1">записаться на занятие</button></div></div></div>');
		if($('div').is('#map2')) {
			ymaps.ready(init);			
			var myMap_mdl, myPlacemark_mdl;	
			function init () {
				if($('div').is('#map2')) {
					var myMap_mdl = new ymaps.Map("map2", {
						center: coord,
						zoom: 15,
						controls: ['zoomControl']
					}, {
						searchControlProvider: 'yandex#search'
					});
					myPlacemark_mdl = new ymaps.Placemark(coord);
					myMap_mdl.geoObjects.add(myPlacemark_mdl);		
					myMap_mdl.behaviors.disable('scrollZoom');
				}
			}
		}
		modal_open();
	});

	$('.show_more').live("click", function() {
		db=$(this).data('db');
		jsn=JSON.stringify({"nm": $(this).data('nm'), "lmt": $(this).data('lmt'), "wh": $(this).data('sql'), "db": db});
		$('#more_data__btn').animate({
			opacity: 0
		}, 300, function() {
			$('#more_data__btn').html('<div id="loader"><img src="'+pref+'templates/default/assets/img/loader.svg" /></div>');
			$('#more_data__btn').animate({
				opacity: 1
			}, 100, function() {
				arg="show_more";
				$.post(pref+'async', {arg:arg,jsn:jsn},
					function(res) {
						setTimeout(function(){
							var req_result = $.parseJSON(res);
							$('#more_data__btn').animate({
								opacity: 0
							}, 400, function() {
								if(req_result['content']!=='') {
									if(db=='news') {
										$('.reload_here').append(req_result['content']);
										$('.reload_here').find('.news_el').animate({
											opacity: 1
										}, 400, function() {});
									} else if(db=='foto') {
										$('.reload_here').append(req_result['content']);
										$('.reload_here').find('.ratio').animate({
											opacity: 1
										}, 400, function() {});
									} else if(db=='faq') {
										$('.reload_here').append(req_result['content']);
										$('.reload_here').find('.faq_el').animate({
											opacity: 1
										}, 400, function() {});
									} else if(db=='says') {
										$('.reload_here').append(req_result['content']);
										$('.reload_here').find('.says_el').animate({
											opacity: 1
										}, 400, function() {});
									}
								}
								if(req_result['button']!=='') {
									$('#more_data__btn').html(req_result['button']);
									$('#more_data__btn').animate({
										opacity: 1
									}, 100, function() {});
								} else {
									$('#more_data__btn').remove();
								}
							});
						}, 800);
					},"text"
				);	
			});
		});
	});

	$('#inner_faq__body__side--top').click(function() {
		ths=$(this);
		if($('#inner_faq__body__side').hasClass('inner_faq__body__side--open')) {
			$('#inner_faq__body__side').removeClass('inner_faq__body__side--open');
			ths.find('a').html(ths.data('txt'));
		} else {
			$('#inner_faq__body__side').addClass('inner_faq__body__side--open');
			ths.find('a').html('Скрыть форму');
		}
	});

	$('.faq_el').live('click', function() {
		jsn=JSON.stringify({"id": $(this).data('id')});
		arg="faq_more";
		$.post(pref+'async', {arg:arg,jsn:jsn},
			function(res) {
				var req_result = $.parseJSON(res);
				$('#mdl').html(req_result['content']);
				modal_open();
			},"text"
		);
	});

	$('.more_saytext').live('click', function() {
		prnt=$(this).parents('div.says_el');
		jsn=JSON.stringify({"id": prnt.data('id')});
		arg="say_more";
		$.post(pref+'async', {arg:arg,jsn:jsn},
			function(res) {
				var req_result = $.parseJSON(res);
				prnt.find('.says_el__bottom > .txt').html(req_result['content']);
			},"text"
		);
	});

	$('.tel_masked').live('focusin', function() {
		$(this).mask("+7 (999) 999 9999", {placeholder: "_" });
	});

	$('.tel_masked').live('focusout', function() {
		if($(this).val().indexOf('_')=='-1') {
			$(this).unmask();
		} else {
			$(this).val('Телефон');
			$(this).unmask();
		}
	});

	function email_check(inp) {
		pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		if(pattern.test(inp.val())) {
			inp.css({"color":"#C4C4C4"});
		} else {
			inp.val('');
		}
	}

	$('.email_masked').live('change',function() {
		email_check($(this));
	});

	$('#faq_send').click(function(e) {
		e.preventDefault();
		err=0; info1=[]; info2=[];
		$('.faq_input').each(function() {
			info1.push($(this).attr('name'));
			if(($(this).val()=='' && $(this).hasClass('req')) || ($(this).val()==$(this).attr('placeholder') && $(this).hasClass('req'))) {
				$(this).addClass('red--color');
				err=1;
				info2.push('');
			} else {
				$(this).removeClass('red--color');
				if($(this).val()==$(this).attr('placeholder')) {
					info2.push('');
				} else {
					info2.push($(this).val());
				}
			} 
		});
		if(err==0) {
			info=createAssociativeArray(info1,info2);
			jsn=JSON.stringify({"info": info});
			$('#mdl').html('<div class="txt"><h3 style="text-align: center;">Отправляем вопрос...</h3></div><div id="loader"><img src="'+pref+'templates/default/assets/img/loader.svg" /></div>');
			modal_open();
			arg='faq_request';
			$.post(pref+'async', {arg:arg,jsn:jsn},
				function(res) {
					setTimeout(function(){
						var req_result = $.parseJSON(res);
						modal_close();
						$('#mdl').html(req_result['content']);
						modal_open();
						$('.faq_input').each(function() {
							$(this).removeClass('red--color');
							$(this).val($(this).attr('placeholder'));
						});
					}, 1400);
				},"text"
			);
		} else {
			$('#mdl').html('<div class="txt"><h3>Вопрос не отправлен</h3><p>Заполните <color style="color: #CC2A2B;">выделенные поля</color> информационной формы чтобы отправить вопрос о работе Автошколы АНО ДПО УМИТЦ.</p></div>');
			modal_open();
		}
	});

	$('#say_send').click(function(e) {
		e.preventDefault();
		err=0; info1=[]; info2=[];
		$('.say_input').each(function() {
			info1.push($(this).attr('name'));
			if(($(this).val()=='' && $(this).hasClass('req')) || ($(this).val()==$(this).attr('placeholder') && $(this).hasClass('req'))) {
				$(this).addClass('red--color');
				err=1;
				info2.push('');
			} else {
				$(this).removeClass('red--color');
				if($(this).val()==$(this).attr('placeholder')) {
					info2.push('');
				} else {
					info2.push($(this).val());
				}
			} 
		});
		if(err==0) {
			info=createAssociativeArray(info1,info2);
			jsn=JSON.stringify({"info": info});
			$('#mdl').html('<div class="txt"><h3 style="text-align: center;">Отправляем отзыв...</h3></div><div id="loader"><img src="'+pref+'templates/default/assets/img/loader.svg" /></div>');
			modal_open();
			arg='say_request';
			$.post(pref+'async', {arg:arg,jsn:jsn},
				function(res) {
					setTimeout(function(){
						var req_result = $.parseJSON(res);
						modal_close();
						$('#mdl').html(req_result['content']);
						modal_open();
						$('.say_input').each(function() {
							$(this).removeClass('red--color');
							$(this).val($(this).attr('placeholder'));
						});
					}, 1400);
				},"text"
			);
		} else {
			$('#mdl').html('<div class="txt"><h3>Отзыв не отправлен</h3><p>Заполните <color style="color: #CC2A2B;">выделенные поля</color> информационной формы чтобы оставить отзыв об обучении в Автошколе АНО ДПО УМИТЦ.</p></div>');
			modal_open();
		}
	});

	$('.to_map').click(function() {
		window.location.href = $(this).data('trgt');
	});

	$('.sld_to').click(function(e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.data('trgt')).offset().top
		}, 600);
		e.preventDefault();
		return false;
	});

	$('.call').live('click', function(e) {
		e.preventDefault();
		close_panel();
		reg=$(this).data('reg');
		if(reg=='') {
			reg='Не указан';
		}
		$('#mdl').html('<div class="txt"><p>Запросите обратный звонок, запишитесь на пробное занятие или задайте интересующий вопрос по работе Автошколы АНО ДПО УМИТЦ:</p></div><div id="mdl_inputs"><input autocomplete="off" class="input mdl_input req" type="text" onfocus="if (this.value == \'Ваше имя\') {this.value = \'\';}" onblur="if (this.value == \'\') {this.value = \'Ваше имя\';}" value="Ваше имя" name="fio" placeholder="Ваше имя" /> <input autocomplete="off" class="input mdl_input tel_masked req" type="text" onfocus="if (this.value == \'Контактный телефон\') {this.value = \'\';}" onblur="if (this.value == \'\') {this.value = \'Контактный телефон\';}" value="Контактный телефон" name="phone" placeholder="Контактный телефон" /> <textarea name="text" class="mdl_input textarea" placeholder="Ваш комментарий / вопрос" onfocus="if (this.value == \'Ваш комментарий / вопрос\') {this.value = \'\';}" onblur="if (this.value == \'\') {this.value = \'Ваш комментарий / вопрос\';}">Ваш комментарий / вопрос</textarea><input name="class" type="hidden" value="'+reg+'" class="mdl_input" placeholder="Район учебного класса" /></div><div class="align_center"><div class="align_center_to_left"><div class="align_center_to_right"><button class="btn mdl_call" id="mdl_req1">отправить</button></div></div></div><p class="conf">Нажимая на кнопку <b>Отправить вопрос</b> вы подтверждаете, что ознакомлены с условиями <b><a href="#" target="_blank">Политики конфиденциальности</a></b> и даете согласие на обработку персональных данных</p>'); 
		modal_open();
	});

	$('.mdl_call').live('click', function(e) {
		e.preventDefault();
		reg=$(this).data('reg');
		err=0; info1=[]; info2=[];
		$('.mdl_input').each(function() {
			info1.push($(this).attr('name'));
			if(($(this).val()=='' && $(this).hasClass('req')) || ($(this).val()==$(this).attr('placeholder') && $(this).hasClass('req'))) {
				$(this).addClass('red--color');
				err=1;
				info2.push('');
			} else {
				$(this).removeClass('red--color');
				if($(this).val()==$(this).attr('placeholder')) {
					info2.push('');
				} else {
					info2.push($(this).val());
				}
			} 
		});
		if(err==0) {
			info=createAssociativeArray(info1,info2);
			jsn=JSON.stringify({"info": info});
			$('#mdl').html('<div class="txt"><h3 style="text-align: center;">Отправляем сообщение...</h3></div><div id="loader"><img src="'+pref+'templates/default/assets/img/loader.svg" /></div>');
			modal_open();
			arg='call_request';
			$.post(pref+'async', {arg:arg,jsn:jsn},
				function(res) {
					setTimeout(function(){
						var req_result = $.parseJSON(res);
						modal_close();
						$('#mdl').html(req_result['content']);
						modal_open();
					}, 1400);
				},"text"
			);
		}
	});

	$('#ham').click(function() {
		$('body').addClass('panel--open');
		$("body").css({"overflow":"hidden",'position':'fixed'});
	});

	$('.panelbtn--close').click(function() {
		close_panel();
	});

	function close_panel() {
		if($('body').hasClass('panel--open')) {
			$('body').removeClass('panel--open');
			$("body").css({"overflow":"auto",'position':'relative'});
		}
	}

});	