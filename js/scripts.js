(function ($) {
    $(document).ready(function () {
        var FULL = 1260;
        var DESKTOP = 1000;
        var TABLET = 768;
        var PHONE = 320;
        
        
        $('.custom-scroll').mCustomScrollbar();
        $('.agreement-text').mCustomScrollbar();
              /*Ширина окна*/

        function getWidth() {

            
            return window.innerWidth;
        }
        
        
        function afterChanges() {
            initCustomForms();
            forceSetInput();
        }
        
        function doubleScroll($elements) {
            var w = getWidth();
            if (w < TABLET || $elements.eq(0).parent().hasClass('est-block') && w < DESKTOP) {
                if (!$('.d-scroll').length) {
                    $elements.each(function (i, element) {
                        if (element.scrollWidth != 0) {
                            var scrollbar = document.createElement('div');
                            scrollbar.className += 'd-scroll';
                            scrollbar.appendChild(document.createElement('div'));
                            scrollbar.style.overflow = 'auto';
                            scrollbar.style.overflowY = 'hidden';
                            scrollbar.firstChild.style.width = element.scrollWidth + 'px';
                            scrollbar.firstChild.style.paddingTop = '1px';
                            scrollbar.firstChild.appendChild(document.createTextNode('\xA0'));
                            scrollbar.onscroll = function () {
                                element.scrollLeft = scrollbar.scrollLeft;
                            };
                            element.onscroll = function () {
                                scrollbar.scrollLeft = element.scrollLeft;
                            };
                            element.parentNode.insertBefore(scrollbar, element);
                        }
                    });
                }
            } else {
                $('.d-scroll').remove();
            }

        }

        doubleScroll($('.table-wrapper'));
     
        
        
        $('body').on('click','.js-switcher', function(e) {
            e.preventDefault();
            $(this).parents('.side').toggleClass('is-closed');
        });
        
        
        function setInput($element) {
            if ($element.hasClass('hasLabel')) {
                $element.addClass('dirty');
                return;  
            } 
            
            var placeholder = $element.attr('placeholder');

            if (placeholder == undefined) return;
            var $parent = $element.parent();
            $parent.css('position', 'relative').find('.note').remove();

            if (placeholder && $element.val().length) {
                var style = "padding-top:" + $parent.css('paddingTop') + ";" + "padding-left:" + $parent.css('paddingLeft') + ";";
                $element.addClass('dirty');
                $parent.append('<div class="note" style="' + style + ';">' + placeholder + '</div>');

            } else {
                $element.removeClass('dirty');
            }
        }

        $('.form-list input, .form-list textarea').keyup(function () {
            setInput($(this));
        });

        function forceSetInput() {
            $('.form-list input, .form-list textarea').each(function () {
                setInput($(this));
            });
        }

        forceSetInput();


        $('input, textarea').blur(function () {
            var $element = $(this);
            setTimeout(function () {
                if (!$element.val().length && !$element.hasClass('hasLabel')) {
                    $element.removeClass('dirty');
                    $element.parent().css('position', 'relative').find('.note').remove();
                }
            }, 100);
        });
        
        
        $("[name='phone']").mask("+7 (999) 999-99-99");
        
                
        $('body').on('click','.js-expand-tasks', function(e){
            e.preventDefault();
            $(this).toggleClass('is-open');
            var text = $(this).data('name');
            $(this).data('name', $(this).text());
            $(this).text(text);
            
            $('.tasks-list-item:not(.tasks-list-item:first-child)').slideToggle();
             
        });
        
        function showPopup(className) {
            $(className).fadeIn();
            afterChanges();
        }
        
        
        
        $('body').on('click', '.js-task-add', function(e){
            e.preventDefault();
            showPopup('.overlay-add-task');
            
           
        });
        
        $('body').on('click', '.js-sign-popup', function(e){
            e.preventDefault();
            showPopup('.overlay-sign');
            
           
        });
        
        
        
        
        $('body').on('click', '.js-popup-close', function(e){
            e.preventDefault();
            $('.overlay').fadeOut();
        });

        
        $('body').on('click', '.js-price-block-toggle', function(e){
            e.preventDefault();
            $(this).parents('.price-block').toggleClass('is-open');
            afterChanges();
        });
        
        $('body').on('click', '.js-surface-toggle', function(e){
            e.preventDefault();
            $(this).parents('.surfaces-list-item').toggleClass('is-open');
            afterChanges();
        });
        
        $('body').on('click','.js-surface-save', function(e){
            e.preventDefault();
            /* smthng to do */
            
            /* smthng to do */
            
            $(this).parents('.surfaces-list-item').toggleClass('is-open');
            afterChanges();
        });
        
         $('body').on('click', '.js-surface-delete', function(e){
            e.preventDefault();
            $(this).parents('.surfaces-list-item').slideUp();
            afterChanges();
        });
        
        $('body').on('click', '.js-add-service', function(e){
            e.preventDefault();
            var $surface = $(this).parents('.surfaces-list-item');
            var $tr = $surface.find('.new-service.is-hide');
            var $newTr = $tr.clone();
            $newTr.removeClass('is-hide').insertBefore($tr);
            $surface.find('.services-save').addClass('is-visible');
            afterChanges();
        });
        
        
        $('body').on('click', '.js-service-delete', function(e){
            e.preventDefault();
             var $surface = $(this).parents('.surfaces-list-item');
            
          
            
            if ($(this).parents('.surfaces-services-list-add').find('.new-service').length == 2) {
                 $surface.find('.services-save').removeClass('is-visible');
            }
             
            
            $(this).parents('.surfaces-services-list > div').remove();
            afterChanges();
        });
        
        $('body').on('click', '.js-price-block-delete', function(e){
            e.preventDefault();
            $(this).parents('.price-block').remove();
            afterChanges();
        });
        
        
        $('body').on('click','.js-persons-toggle',function(e){
           e.preventDefault();
            $(this).parents('.persons').toggleClass('is-open').find('.persons-list').slideToggle();
        });
        
        $('body').on('click','.tasks-header > span',function(e){
              e.preventDefault();
            var w = getWidth();
            if (w < DESKTOP) {
                $(this).parents('.tasks').toggleClass('is-open').find('.tasks-list').slideToggle();
            }
        });
        
        $('body').on('click','.js-menu-show', function(e){
           e.preventDefault();
            $('.mobile').slideDown();
        });
        
        $('body').on('click','.js-menu-close', function(e){
             e.preventDefault();
            $('.mobile').slideUp();
            
        });
        
        $('body').on('click','.js-price-block-switcher', function(e){
            e.preventDefault();
            $(this).parents('.price-block').toggleClass('is-inactive');
        });
        
        $('body').on('click','.js-filter-block-toggle', function(e){
            e.preventDefault();
            $(this).parents('.filter-block').toggleClass('is-open');
        });
        
        
        
        $('body').on('click', '.js-notifications-switcher > label', function(){
            var id = $(this).data('id');
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().find('.notifications-switcher').attr('data-id', id);
        });
        
        $('body').on('click', '.js-notifications-switcher > .notifications-switcher', function(){
            var id = 1 - $(this).attr('data-id');
            console.log(id);
            
            $(this).parent().find('label').not('.active').addClass('active').siblings().removeClass('active');
            $(this).attr('data-id', id);
        
        });
                
        
        function setSliderHeight() {
            var w = getWidth();
            
            
            if (w >= TABLET) { 
                setTimeout(function(){
                    var height = $('.main-cols-right').outerHeight();
                    $('.js-slider .slider-item').height(height);
                }, 100);
            } else {
                $('.js-slider .slider-item').height('375px');
            }
        }
        
        
        function mobileMenu() {
            var w = getWidth();
            if (w >=TABLET) {
                if ($('.mobile-menus .main-menu').length > 0) {
                    $('.main-menu').appendTo('.header-menu');
                }
                
                 $('.footer-menus-item').each(function(){
                    if ($(this).parents('.mobile-footer').length > 0) {
                         $(this).appendTo('.footer-menus');
                    }
                });
                
                if ($('.mobile-footer .header-phone').length > 0) {
                    $('.header-phone').prependTo('.header > .inner');
                }
                
                
                $('.main-menu .parent ul').hide();
                $('.mobile-fullscreen').hide();
               
                
               
                
                
            } else {
                if ($('.mobile-menus .main-menu').length == 0) {
                    $('.main-menu').appendTo('.mobile-menus');
                }
                
                $('.footer-menus-item').each(function(){
                    if ($(this).parents('.mobile-footer').length == 0) {
                         $(this).appendTo('.mobile-footer');
                    }
                });
                
                if ($('.mobile-footer .header-phone').length == 0) {
                    $('.header-phone').appendTo('.mobile-footer');
                }
                
                if ($('.mobile-footer .soc-list').length == 0) {
                    $('.soc-list').clone().appendTo('.mobile-footer');
                }
                
                    
               
            }
        }
        
        
         /* возврат к базовым значениям при смене размера экрана*/

        function resetState() {
            var w = getWidth();
            setSliderHeight();
            mobileMenu();
                        
            if (w < FULL) {
                $('.side').addClass('is-closed');
            }
            
            if (w < DESKTOP) {
                $('.js-switch-first').insertAfter('.js-switch-second');
                
                    $('.js-new-service__input').each(function(){
                        $parent = $(this).parents('.new-service');
                        $parent.find('.js-new-service-tablet').append($(this));
                    });
                $('.tasks-list').hide();
                 $('.tasks').removeClass('is-open');
                
                
            } else {
                $('.js-switch-second').insertAfter('.js-switch-first');
                $('.tasks-list').show();
                $('.tasks').removeClass('is-open');
                
                  $('.js-new-service__input').each(function(){
                        $parent = $(this).parents('.new-service');
                        $parent.find('.js-new-service-desktop').append($(this));
                    });
                
            }
            
            if (w < TABLET) {
                $('.menu').appendTo('.mobile-menus');
                $('.menu-right').insertBefore('.main-header__stage');
                $('.js-moveable-filter-button').insertAfter('.filter-cols');
                
            } else {
                
                $('.menu').appendTo('.side');
                $('.menu-right').insertAfter('.header-stages');
                $('.js-moveable-filter-button').appendTo('.filter-cols-left');
                
            }
            
          
            
            
            
        }
        resetState();
        
        $(window).resize(function () {
            var w = getWidth();
            
            
            resetState();
            doubleScroll($('.table-wrapper'));
            initCustomForms();
        });
        
        
          $('.js-show-form').click(function () {
            $('.overlay-form').fadeIn();
            return false;
        });
        
        
         function clickOutside(e, $div) {
            if (!$div.is(e.target) &&
                $div.has(e.target).length === 0) {
                //$div.hide();
                return true;
            } else {
                return false;
            }
        }

        $('.overlay').click(function (e) {
            if (clickOutside(e, $('.popup'))) {
                $(this).fadeOut();
            }

            
        });
        
           $('.js-mobile-close').click(function(){
            $('.mobile').slideUp();
        });
        
        
        
        /*
        
        
                
        if ($('.js-slider').length) {
            $('.js-slider').each(function(){
                $(this).owlCarousel({
                    nav: true,
                    dots:true,
                    margin: 0,
                    autoHeight: false,
                    navText: ['', ''],
                    autoplayTimeout:3000,
                    autoplay: false,
                    loop:true,
                    items:1,
                    onInitialize: setSliderHeight,
                    onResize: setSliderHeight,
                    animateOut: 'slideOutUp',
                    animateIn: 'slideInUp',
                    mouseDrag:false
                }).addClass('owl-carousel');
            });
        }
        
        
        if ($('.js-carousel-ideas').length) {

            $('.js-carousel-ideas').each(function(){
                $(this).owlCarousel({
                    
                nav: true,
                          dots:false,
                margin: 30,
                autoHeight: false,
                    autoplayTimeout:3000,
                navText: ['', ''],
                autoplay: false,
                    
                    loop:true,
                responsive: {
                    0: {
                        items: 1,
                         nav: false,
                dots:true,
                         
                    },
                    440: {
                         items: 1,
                    },
                    660: {
                         items: 2,
                        nav:true,
                        dots:false,
  margin:20
                    },
                    
                    
                     1000: {
                        items: 3,
                          margin:24,
                    },
                    
                    1260: {
                        margin:30
                    }
                    

                }
            }).addClass('owl-carousel');
            });
        }
        
        
        if ($('.js-carousel-products').length) {

            $('.js-carousel-products').each(function(){
                $(this).owlCarousel({
               nav: true,
                          dots:false,
                margin: 30,
                autoHeight: false,
                navText: ['', ''],
                autoplay: false,
                    dots:false,
                    autoplayHoverPause:true,
                    autoplayTimeout:3000,
                    loop:true,
                     stagePadding: 15,
                    mouseDrag:false,
                     items: 4,
                responsive: {
                    0: {
                        items: 2,
                         nav: false,
                dots:true,
                        margin: 10,
                         stagePadding: 0
                         
                    },
                  
                    660: {
                         items: 3,
                          margin:20,
                           nav: true,
                          dots:false,
  
                    },
                     1000: {
                        items: 4,
                          margin: 24,
                        
                        
                    },
                    
                      1260: {
                        margin:30,
                         
                    }
                    

                }
            }).addClass('owl-carousel');
            });
        }
        
        
        
        
       
        
        
        
        

  
        
        
        
        function makeSelect() {
            if ($('.phone-submenu').length) {
                var width = getWidth();
                if (width >= TABLET) {
                  //  $('.submenu-select').parent().remove();
                    $('.submenu-select').remove();
                } else {
                    if ($('.submenu-select').length) {} else {
                        var options = '';
                        $('.phone-submenu li').each(function () {
                            var href = $(this).find('a').attr('href');
                            var html = $(this).find('a').html();
                            var selected = "";
                            if ($(this).hasClass('active')) {
                                selected = 'selected';
                            }
                            options += '<option ' + selected + ' value="' + href + '">' + html + '</option>';
                        });
                        var $select = '<select class="submenu-select"></select>';
                        $('.catalog-header').after($select);
                        $('.submenu-select').append(options);
                        initCustomForms();
                    }
                }
            }
        }

        $('body').on('change', '.submenu-select, .sub-submenu-select', function () {
            //window.location.replace('http://www.addic.ru' + $(this).val());
            window.location.replace('http://' + document.domain + $(this).val());
        });
        
        
       
        
        $('.js-show-catalog-left-menu').click(function(){
            $(this).toggleClass('is-open').parent().find('.js-left-menu').slideToggle();
            return false;
        });
        
        $('.js-show-filter').click(function(){
           $('.mobile-filter').slideDown();
        });
        
        
        $('.filter-blocks-item__header').click(function(){
            var $block = $(this).parent();
            $block.toggleClass('is-open').find('.filter-blocks-item-body').slideToggle();
            return false; 
        });
        
          
        
        $("body").on('click', '[href*="#"]', function (e) {
             var w = getWidth();
               
         
            
            if ($(this.hash).length > 0) {
                $('html, body').stop().animate({
                    scrollTop: $(this.hash).offset().top
                }, 500);
                
            }
            
            e.preventDefault();
        });
        
        
        


        function tabSlideInit(selector) {

            if ($(selector).length) {
                setTimeout(function () {
                    var owl = $(selector).owlCarousel({
                        nav: true,
                        autoHeight: false,
                        navText: ['', ''],
                        responsive: {
                            0: {
                                items: 1
                            },

                            450: {
                                items: 2
                            },

                            650: {
                                items: 3

                            }

                        }
                    }).addClass('owl-carousel');
                    zoomVideo();
                }, 100);
            }
        }


        function mobSlideInit(selector) {
            var autoH = false;
            if ($(selector).length) {
                setTimeout(function () {
                    if (selector == '.object-icons' || selector == '.reasons-list' || selector == '.how-we-work-list' ) {
                        autoH = true;
                    }
                    var owl = $(selector).owlCarousel({
                        nav: false,
                        items: 1,
                        autoHeight: autoH,
                        navText: ['', ''],

                        responsive: {
                            0: {
                                items: 1
                            },

                            480: {
                                items: 1

                            }
                        }
                    }).addClass('owl-carousel');

                }, 100);
            }

        }

        var owls = ['.advantages-cols'];

        function mobileSliderSet() {
            setTimeout(function () {
                var max;
                var width = getWidth();
                for (var i = 0; i < owls.length; i++) {
                    if ($(owls[i]).hasClass('js-not-slider')) continue;

                    if ($(owls[i]).hasClass('js-tablet-slider')) {
                        max = DESKTOP;
                    } else {
                        max = TABLET;
                    }
                    var owl = $(owls[i]).data('owlCarousel');
                    if (width < max) {
                        if (!owl) {
                            if (max == DESKTOP) {
                                tabSlideInit(owls[i]);
                            } else {
                                mobSlideInit(owls[i]);
                            }
                        }
                    } else {
                        $(owls[i]).trigger('destroy.owl.carousel').removeClass('owl-carousel');
                    }
                }
            }, 100);
        }

        mobileSliderSet();


        function setEqualHeight(element, reset, heights) {

            setTimeout(function () {
                var w = getWidth();
                element.find(reset).css('height', 'auto');

                var maxH = [];
                element.find(heights).each(function () {
                    maxH.push($(this).outerHeight());

                });
                
                console.log(maxH);

                element.find(reset).css('height', Math.max.apply(null, maxH));
            }, 500);

        }
        
        
        
        

        
          

        
        

        
        function makePortfolioSelect(tabs, select) {
             if ($(tabs).length) {
                var width = getWidth();
                if (width >= TABLET) {
                    $(select).parent().remove();
                    $(select).remove();
                } else {
                    if ($(select).length) {} else {
                        var options = '';
                        $(tabs).find('li').each(function () {
                            var href = $(this).index();
                            var html = $(this).html();
                            var selected = "";
                            if ($(this).hasClass('button-tag-active')) {
                                selected = 'selected';
                            }
                            options += '<option ' + selected + ' value="' + href + '">' + html + '</option>';
                        });
                        var $select = '<select class="' + select.replace('.', '') + '"></select>';
                        $(tabs).after($select);
                        $(select).append(options).wrap('<div class="l-center"></div>');
                        initCustomForms();
                    }
                }
            }
        }
        
        $('body').on('change','.portfolio-select', function(){
            var i = $(this).val();
           
            $('.portfolio-list .button-tag-active').removeClass('button-tag-active');
            $('.portfolio-list > li').eq(i).addClass('button-tag-active');
            $('.portfolio-slider-block').removeClass('portfolio-slider-active').eq(i).addClass('portfolio-slider-active');
            
            
        });
     


        if ($('.js-carousel').length) {

            $('.js-carousel').each(function(){
                $(this).owlCarousel({
                nav: false,
                dots:true,
                margin: 0,
                autoHeight: false,
                navText: ['', ''],
                autoplay: false,
                responsive: {
                    0: {
                        items: 1,
                         
                    },
                    
                    440: {
                         items: 2,
                       
                        
                    },
                    660: {
                         items: 3,
                       
                       
                    },
                    

                  
                    1000: {
                        items: 4
                    },
                     1260: {
                        items: 5
                    },
                    

                }
            }).addClass('owl-carousel');
            });
        }
        
        
        
        
        
       






        /* переключение табов*/
   /*

        $('body').on('click', '.l-tabs > li > a', function(e) {
            
                console.log('click');

            var $list = $(this).parents('.l-tabs');
            if ($list.hasClass('submenu-tabs')) {
                return true;
            }
            e.preventDefault();
            var $tabs = $list.parent().parent().find('.tabs-container');
            
          

            $list.find('.active-tab').removeClass('active-tab');
            $tabs.find('.tab-content').removeClass('tab-content-active').eq($(this).parent().index()).addClass('tab-content-active');
            $(this).parent().addClass('active-tab');
            $(window).trigger('resize');
            //initScrolls('.js-scroll');
            
            return false;
        });




        /*  */
        
        /*


        $('.js-show-popup').click(function () {
            $('.overlay-callback').fadeIn();
            return false;
        });

        
      
        



        /* */

       
/*


        function setEqualHeightGrid(selector) {
            $(selector).each(function () {
                var widthAll = $(this).width();
                var $items = $(this).find('.catalog-grid-item');
                var width = $items.height('auto').eq(0).width();
                var itemsPerRow = parseInt(widthAll / width);
                var heights = [];
                var max = 0;
                
                var number = Math.ceil($items.length / itemsPerRow);
                for (var i = 0; i < number; i++) {
                    for (var j = 0; j < itemsPerRow; j++) {
                        heights.push($(this).children('div').eq(itemsPerRow * i + j).children().height());
                    }
                    max = Math.max.apply(null, heights);
                    for (var j = 0; j < itemsPerRow; j++) {
                        $items.eq(itemsPerRow * i + j).height(max);
                    }
                    heights = [];
                }
            });
        }
        
        
     
        
        $('.js-mobile-filter-close').click(function(){
            $('.mobile-filter').slideUp();
        });
        
        $('.burger').click(function(){
            $('.phone-icon, .search-icon').removeClass('is-open');
            $('.mobile-ul,.mobile-header, .mobile-menu, .header-phone').show();
            $('.header-search').hide();
            $('.mobile').removeClass('phone').slideDown();
            
            
        });
        
        $('.phone-icon').click(function(){
           $('.search-icon').removeClass('is-open');
            $(this).toggleClass('is-open');
            if ($(this).hasClass('is-open')) {
                $('.mobile-header, .mobile-ul, .mobile-menu, .header-search').hide();
                $('.header-phone').show();
                $('.mobile').addClass('phone').slideDown();
            } else {
                $('.mobile').slideUp(function(){
                    $('.mobile').removeClass('phone');
                });
            }
            
            
        });
        
         $('.search-icon').click(function(){
            $('.phone-icon').removeClass('is-open');
            $(this).toggleClass('is-open');
            if ($(this).hasClass('is-open')) {
                $('.mobile-ul, .mobile-header, .mobile-menu, .header-phone').hide();
                $('.header-search').show();
                $('.mobile').addClass('phone').slideDown();
            } else {
                $('.mobile').slideUp(function(){
                    $('.mobile').removeClass('phone');
                });
            }
             
            
        });
        
        
        $('body').on('click', '.footer-header', function(e){
            $(this).toggleClass('is-open').parent().find('.footer-menus-item-list').slideToggle();
        });
        
        
        
        $('body').on('click', '.mobile li.parent > a', function(e){
          
            
            
            if (e.target.tagName != 'SPAN') {
                e.preventDefault();
                $(this).toggleClass('is-open').parent().find('ul').slideToggle();
            }
            
            

            
            
           // $('.mobile .choosen').hide().siblings().hide();
            
            
           
            
         //   $(this).parents('ul').siblings().hide();
            
        });
        
        $('.mobile-prev').click(function(){
           var $choosen = $('.mobile .choosen');
           $choosen.children('ul').hide();
           $choosen.removeClass('choosen').siblings().show(); 
           $choosen.parent().closest('li').addClass('choosen').children('a').show();
           if ($('.mobile .choosen').parent().hasClass('mobile-ul')) {
                $('.mobile-header').removeClass('header-with-prev');
           } 
          // if () 
        });
        



     

       


/*
        function makeSelect(tabs, select) {
            if ($(tabs).length) {
                var width = getWidth();
                if (width >= TABLET) {
                    $(select).parent().remove();
                    $(select).remove();
                } else {
                    if ($(select).length) {} else {
                        var options = '';
                        $(tabs).find('li').each(function () {
                            var href = $(this).find('a').attr('href');
                            var html = $(this).find('a').html();
                            var selected = "";
                            if ($(this).hasClass('is-active') || $(this).hasClass('active-tab')) {
                                selected = 'selected';
                            }
                            options += '<option ' + selected + ' value="' + href + '">' + html + '</option>';
                        });
                        var $select = '<select class="' + select.replace('.', '') + '"></select>';
                        $(tabs).after($select);
                        $(select).append(options).wrap('<div class="l-center"></div>');
                        initCustomForms();
                    }
                }
            }


        }
        */
        
        /*


        $('body').on('change', '.submenu-select', function () {
            window.location.replace('http://' + document.domain + $(this).val());
        });

        $('body').on('change', '.item-tabs-select, .popular-tabs-select', function () {
            var index = $(this).find('option:selected').index();
            $(this).parent().next().find('.tab-content').removeClass('tab-content-active').eq(index).addClass('tab-content-active');
        });
        
      
        
       

        
        
        $(document).scroll(function () {
        /*    var w = window.innerWidth;
        
            var bodyOffset = window.pageYOffset;
             
            
            if (0 < bodyOffset ) {
                if (!$('.header').hasClass('is-fixed')) {
                    $('.header').addClass('is-fixed');
                    
                }
                
               
            } else {
                if ($('.header').hasClass('is-fixed')) {
                   $('.header').removeClass('is-fixed');
                }
            } */
                
           
      //  });
        
        /*

    
        $(window).resize(function () {
            var w = getWidth();
            //  carouselReload('.js-carousel');
            mobileSliderSet();
            

          //  deleteScrolls();
    //        initScrolls($('.js-scroll'));
          
            resetState();

            //zoomVideo();
            doubleScroll($('.table-wrapper'));
            
          
            
           

            initCustomForms();
        });
        */
        
        
        
       
        
        



    });
})(jQuery);
