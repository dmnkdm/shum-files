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
        
        
        
        
        
        

        
        
         $('body').on('click','.payments-header > span',function(e){
              e.preventDefault();
            var w = getWidth();
            if (w < DESKTOP) {
                $(this).parents('.payments').toggleClass('is-open').find('.payments-subheader, .payments-body').slideToggle();
            }
        });
       
        
          
        $('body').on('click', '.js-payment-add', function(e){
            e.preventDefault();
            showPopup('.overlay-add-payment');
            
           
        });
        
         $('body').on('click', '.l-tabs > li > a', function(e) {
            
                console.log('click');

            var $list = $(this).parents('.l-tabs');
            if ($list.hasClass('submenu-tabs')) {
                return true;
            }
            e.preventDefault();
            var $tabs = $list.parent().parent().find('.tabs-container');
            
          

            $list.find('.active').removeClass('active');
            $tabs.find('.tab-content').removeClass('tab-content-active').eq($(this).parent().index()).addClass('tab-content-active');
            $(this).parent().addClass('active');
            $(window).trigger('resize');
            //initScrolls('.js-scroll');
            
            return false;
        });
        
        
         $('body').on('click', '.js-add-handbook-item-service', function(e){
            e.preventDefault();
            var $surface = $(this).parents('.price-block-handbook');
            $surface.addClass('is-open');
            var $tr = $surface.find('.new-service.is-hide');
            var $newTr = $tr.clone();
            $newTr.removeClass('is-hide').insertBefore($tr);
           // $surface.find('.services-save').addClass('is-visible');
            afterChanges();
        });
        

        
        



    });
})(jQuery);
