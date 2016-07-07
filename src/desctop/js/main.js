$(document).ready(function() {

    //menu
    $('.menu_btn').click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass('as-close')) {
            $(this).addClass('as-close');
            $('.menu').removeClass('closed');
            $('body>*').not('.menu').not('header').click(function() {
                $('.menu_btn').removeClass('as-close');
                $('.menu').addClass('closed');
                $('body>*').not('.menu').not('header').unbind('click');
            });
        } else {
            $(this).removeClass('as-close');
            $('.menu').addClass('closed');
            $('body>*').not('.menu').not('header').unbind('click');
        }
    });


    //scroll-btns
    header_height = $('header').outerHeight();
    $('.scroll-btn').click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top - header_height
        }, 500);
        $('.menu_btn').removeClass('as-close');
        $('.menu').addClass('closed');
        $('body>*').not('.menu').not('header').unbind('click');
        if ($(this).hasClass('as_btn')) {
            $('.' + $(this).data('btn')).trigger('click');
        }
    });

    //popaps
    $('.close').click(function() {
        $(this).parent().removeClass('opened').arcticmodal('close');
    });

    //
    $.arcticmodal('setDefault', {
        speed: 0,
        beforeOpen: function(data, el) {
            if (!isMobile) {
                $('body').addClass('overflow-hidden');
            }
        },
        afterOpen: function(data, el) {
            $(el).addClass('opened');
        },
        beforeClose: function(data, el) {
            $(el).removeClass('opened');
        },
        afterClose: function(data, el) {
            //$('body').removeClass('overflow-hidden');
        }
    });

    //popap_type_1
    $('.b_p_type1').click(function(e) {
        e.preventDefault();
        $($(this).attr('href')).find('input[name="event"]').val($(this).data('event'));
        $($(this).attr('href')).find('input[name="frmid"]').val($(this).data('frmid'));
        $($(this).attr('href')).arcticmodal({
            afterClose: function(data, el) {
                $('body').removeClass('overflow-hidden');
            }
        });
    });

    //popap_type_2{

    $('.b_p_type2').click(function(e) {
        e.preventDefault();
        var url = $(this).data('pop')
        $('#otel1').arcticmodal({
            type: 'ajax',
            url: url,
            speed: 0,
            beforeOpen: function(data, el) {
                if (!isMobile) {
                    $('body').addClass('overflow-hidden');
                }
            },
            afterOpen: function(data, el) {
                el = '.popap.p_type2';
                $(el).addClass('opened');
                $(el).closest('.arcticmodal-container_i').width('100%');
                //;
                //setTimeout(sld_hot1.reloadSlider,1000);
                var id_element = '#' + $(el).find('.sld2').attr('id');
                var id_next = '#' + $(el).find('.sldo_l').attr('id');
                var id_prev = '#' + $(el).find('.sldo_r').attr('id');
                var id_pager = '#' + $(el).find('.eli_gro').attr('id');

                var heights = $($(el).find('img')).map(function() {
                        return $(this).height();
                    }).get(),

                    maxHeight = Math.max.apply(null, heights);

                $(el).find('.otel_sl .sld2').height(maxHeight).css('line-height', maxHeight);
                if (!isMobile) {
                    $(el).css('min-height', maxHeight);
                }
                //make_slider_hot(id_element,id_next,id_prev,id_pager);
                setTimeout(function() {
                    make_slider_hot(id_element, id_next, id_prev, id_pager);
                    console.log('make_slider_hot');
                }, 600);
                init_hot_popup();
                init_pop_form();
            },
            beforeClose: function(data, el) {
                $(el).removeClass('opened');
            },
            afterClose: function(data, el) {
                $('body').removeClass('overflow-hidden');
                sld_hot.destroySlider();
            }
        });
    });
    //video-append
    if (!isMobile) {
        $('<video autoplay loop poster="img/bg_sec1.jpg" id="bgvid"><source src="js/main.mp4" type="video/mp4"></video>').appendTo('#sec1')
    } else {
        $('<style>body.overflow-hidden{overflow:initial!important}</style>')
    }

    //sld-partners
    slider1 = $('.sld1_w').bxSlider({
        infiniteLoop: true,
        nextSelector: '#sld1_l',
        prevSelector: '#sld1_r',
        controls: true,
        pager: true,
        pagerCustom: '#sld1_p',
        auto: false,
        speed: 500,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        onSlideNext: function($slideElement, oldIndex, newIndex) {},
        onSlidePrev: function($slideElement, oldIndex, newIndex) {},
        onSliderLoad: function() {}
    });

    //sld-hotels
    function init_pop_sld(element) {
        $(element).closest('.ot_wrap').find('.sldo_r').children('a').trigger('click');
        console.log($(element).attr('id'));
        var heights = $($(element).find('img')).map(function() {
                return $(this).height();
            }).get(),

            maxHeight = Math.max.apply(null, heights);
        $(element).closest('otel_sl').height(maxHeight);
        $(element).closest('.ot_wrap').height(maxHeight);
        $(element).closest('.ot_wrap').find('.bx-viewport').height(maxHeight);
        $(element).closest('.ot_wrap').find('.otel_sl li').height($(element).closest('.ot_wrap').height()).css('line-height', $(element).closest('.ot_wrap').height() + 'px').css('margin-top', '0');
    }

    function make_slider_hot(element, prev, next, pager) {
        sld_hot = $(element).bxSlider({
            infiniteLoop: true,
            nextSelector: next,
            prevSelector: prev,
            controls: true,
            pagerCustom: pager,
            auto: false,
            speed: 500,
            slideMargin: 10,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 1,
            onSlideNext: function($slideElement, oldIndex, newIndex) {
                console.log('pop-sld.next')
            },
            onSlidePrev: function($slideElement, oldIndex, newIndex) {
                console.log('pop-sld.prev')
            },
            onSliderLoad: function() {
                setTimeout(init_pop_sld(element), 500);
            }
        });
        //$('.arcticmodal-container_i2').find('.popap.p_type2.opened').width('100vw')
    }
    //init popup for hotels
    function init_hot_popup() {
        $('.popap.p_type2').find('.close3').unbind('click');
        $('.popap.p_type2').find('.close3').click(function() {
            $(this).parent().removeClass('opened');
            $(this).parent().arcticmodal('close');
        });

        //$('.otel_btn').unbind('click');
        //$('.otel_btn').click(function(e) {
        //    e.preventDefault();
        //    $('#pop3').arcticmodal();
        //});


        //$('#pop3 .close').unbind('click');
        //$('#pop3 .close').click(function(){
        //    $('#pop3').removeClass('opened');
        //    $('#pop3').arcticmodal('close');
        //});

    }
    //sec4
    $('.sec4 a.podr').click(function(e) {
        e.preventDefault();
        $(this).parent().find('.toch').hide();
        $(this).parent().find('.ur_dn').show();
        $(this).hide();
    });


    //sec5
    $('.kli_gr a').click(function(e) {
        e.preventDefault();
    });

    $('.kli1, .kli2, .kli3').click(function(e) {
        var url = $(this).data('pop')
        $('#yslyg').arcticmodal({
            type: 'ajax',
            url: url,
            speed: 0,
            beforeOpen: function(data, el) {
                if (!isMobile) {
                    $('body').addClass('overflow-hidden');
                }
            },
            afterOpen: function(data, el) {
                el = '#yslyg';
                $(el).addClass('opened');
                //$(el).closest('.arcticmodal-container_i').width('100%');

                //$('.close2').hide().next().hide();
                //$('.close2').delay(600).fadeIn(500).next().fadeIn(500);

                setTimeout(init_yslyg_popup, 600);
            },
            beforeClose: function(data, el) {
                $(el).removeClass('opened');
            },
            afterClose: function(data, el) {
                $('body').removeClass('overflow-hidden');
            }
        });
    });


    function init_yslyg_popup() {
        $('<div class="close2"></div><a class="tel_p" href="tel:+79255182205">+7 925 518-22-05</a>').appendTo('.arcticmodal-container_i2');

        $('#yslyg').parent().children('.close2').unbind('click');
        $('#yslyg').parent().children('.close2').click(function() {
            $(this).hide().next().hide();
            $(this).parent().children('#yslyg').removeClass('opened');
            $(this).parent().children('#yslyg').arcticmodal('close');
        });

        $('#yslyg').find('.btn_podr').click(function(e) {
            e.preventDefault();
            $('#pop1').find('input[name="event"]').val($(this).data('event'));
            $('#pop1').find('input[name="frmid"]').val($(this).data('frmid'));
            $('#pop1').arcticmodal({});
        });
        //$('#pop3 .close').unbind('click');
        //$('#pop3 .close').click(function(){
        //    $('#pop3').removeClass('opened');
        //    $('#pop3').arcticmodal('close');
        //});

    }
    //sec 6
    $('.etap a').click(function(e) {
        e.preventDefault();
        $(this).hide().prev().children('span').show();

    });

    //sec7
    $('.poez a').click(function(e) {
        e.preventDefault();
        $('#pop1').arcticmodal({
            afterClose: function(data, el) {
                $('body').removeClass('overflow-hidden');
            }
        });
    });

    //radiobtns
    $('.radio1').click(function(e) {
        e.preventDefault();
        $('.radio1').removeClass('active');
        $(this).addClass('active');
        $('input[name="radio1"]').val($(this).text());

    });

    $('.radio2').click(function(e) {
        e.preventDefault();
        $('.radio2').removeClass('active');
        $(this).addClass('active');
        $('input[name="radio2"]').val($(this).text());
    });

    //otdel-broni
    $('.letter').click(function(e) {
        e.preventDefault();
        $('#pop3').find('input[name="event"]').val($(this).data('event'));
        $('#pop3').find('input[name="frmid"]').val($(this).data('frmid'));
        $('#pop3').arcticmodal({
            afterClose: function(data, el) {
                $('body').removeClass('overflow-hidden');
            }
        });
    });

    //rewievs
    $('.sotr_gr a').fancybox({
        padding: 0,
        helpers: {
            overlay: {
                locked: false
            },
            title: null
        }
    });

    //forms
    $('input[name="phone"]').mask('+7 (999) 999-99-99');
    $('input[name="phone"]').blur(function() {
        if ($(this).val().length != 18) {
            $(this).addClass('error-input');
        }
    });
    $('input[name="phone"]').focus(function() {
        $(this).removeClass('error-input');
    });

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    };
    $('input#email-valid').blur(function() {
        if (!validateEmail($(this).val())) {
            $(this).addClass('error-input');
        }
    });
    $('input#email-valid').focus(function() {
        $(this).removeClass('error-input');
    });

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function run_geo(geo_url) {
        $.ajax({
            type: 'GET',
            url: geo_url,
            dataType: 'xml',
            success: function(xml) {
                $(xml).find('ip').each(function() {
                    var city = $(this).find('city').text();
                    var region = $(this).find('region').text();
                    if (city != region) {
                        var ipg = city + ', ' + region;
                    } else {
                        var ipg = city;
                    }
                    $('<input type="hidden" />').attr({
                        name: 'location',
                        class: 'location',
                        value: ipg
                    }).appendTo("form");
                });
            }
        });
    }
    $.get("http://ipinfo.io", function(response) {
        geo_url = 'http://ipgeobase.ru:7020/geo?ip=' + response.ip;
        run_geo(geo_url);
    }, "jsonp");
    utm = [];
    $.each(["utm_source", "utm_medium", "utm_campaign", "utm_term", 'source_type', 'source', 'position_type', 'position', 'added', 'creative', 'matchtype'], function(i, v) {
        $('<input type="hidden" />').attr({
            name: v,
            class: v,
            value: function() {
                if (getURLParameter(v) == undefined) return '-';
                else return getURLParameter(v)
            }
        }).appendTo("form")
    });
    $('<input type="hidden" />').attr({
        name: 'url',
        value: document.location.href
    }).appendTo("form");
    $('<input type="hidden" />').attr({
        name: 'title',
        value: document.title
    }).appendTo("form");

    $('form').submit(function(e) {
        e.preventDefault();
        $(this).find('input[type="text"]').trigger('blur');
        if (!$(this).find('input[type="text"]').hasClass('error-input')) {
            var type = $(this).attr('method');
            var url = $(this).attr('action');
            var data = $(this).serialize();
            var track_event = $(this).find('input[name="event"]').val();
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function() {
                    $.arcticmodal('close');
                    $('#okgo').arcticmodal({
                        beforeClose: function(data, el) {
                            $(el).removeClass('opened');
                        },
                        afterClose: function(data, el) {
                            $('body').removeClass('overflow-hidden');
                        }
                    });
                    yaCounter37958570.reachGoal(track_event);
                    yaCounter37958570.reachGoal('form_submit');
                    //ga('send','event','submit',track_event);
                }
            });
        }
    });

    function init_pop_form() {
        //$('form#pop-form').unbind('');



        $('form#pop-form input[name="phone"]').mask('+7 (999) 999-99-99');
        $('form#pop-form input[name="phone"]').blur(function() {
            if ($(this).val().length != 18) {
                $(this).addClass('error-input');
            }
        });
        $('form#pop-form input[name="phone"]').focus(function() {
            $(this).removeClass('error-input');
        });

        function getURLParameter(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
        }

        function run_geo(geo_url) {
            $.ajax({
                type: 'GET',
                url: geo_url,
                dataType: 'xml',
                success: function(xml) {
                    $(xml).find('ip').each(function() {
                        var city = $(this).find('city').text();
                        var region = $(this).find('region').text();
                        if (city != region) {
                            var ipg = city + ', ' + region;
                        } else {
                            var ipg = city;
                        }
                        $('<input type="hidden" />').attr({
                            name: 'location',
                            class: 'location',
                            value: ipg
                        }).appendTo("form#pop-form");
                    });
                }
            });
        }
        $.get("http://ipinfo.io", function(response) {
            geo_url = 'http://ipgeobase.ru:7020/geo?ip=' + response.ip;
            run_geo(geo_url);
        }, "jsonp");
        utm = [];
        $.each(["utm_source", "utm_medium", "utm_campaign", "utm_term", 'source_type', 'source', 'position_type', 'position', 'added', 'creative', 'matchtype'], function(i, v) {
            $('<input type="hidden" />').attr({
                name: v,
                class: v,
                value: function() {
                    if (getURLParameter(v) == undefined) return '-';
                    else return getURLParameter(v)
                }
            }).appendTo("form#pop-form")
        });
        $('<input type="hidden" />').attr({
            name: 'url',
            value: document.location.href
        }).appendTo("form#pop-form");
        $('<input type="hidden" />').attr({
            name: 'title',
            value: document.title
        }).appendTo("form#pop-form");


        $('form#pop-form').submit(function(e) {
            e.preventDefault();
            $(this).find('input[type="text"]').trigger('blur');
            if (!$(this).find('input[type="text"]').hasClass('error-input')) {
                var type = $(this).attr('method');
                var url = $(this).attr('action');
                var data = $(this).serialize();
                var track_event = $(this).find('input[name="event"]').val();
                $.ajax({
                    type: type,
                    url: url,
                    data: data,
                    success: function() {
                        $.arcticmodal('close');
                        $('#okgo').arcticmodal({
                            beforeClose: function(data, el) {
                                $(el).removeClass('opened');
                            },
                            afterClose: function(data, el) {
                                $('body').removeClass('overflow-hidden');
                            }
                        });
                        yaCounter37958570.reachGoal(track_event);
                        yaCounter37958570.reachGoal('form_submit');
                        //ga('send','event','submit',track_event);
                    }
                });
            }
        });




    }




    function init_menu() {
        header_height = $('header').outerHeight();
        console.log(header_height);
        $('.menu').css('top', header_height + 'px');
    }

    function init_firts_block_mobile() {
        $(window).scroll(function() {

            $('#sec1').removeClass('notrans');
            if ($('body').scrollTop() > 0) {
                $('#sec1').addClass('sec1_n');
                $('header,.menu').addClass('blacked');

            } else {
                $('#sec1').removeClass('sec1_n');
                $('header,.menu').removeClass('blacked');
            }
        });

        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width >= 501) {
            $('#sec1').addClass('notrans');
            $('#sec1').addClass('sec1_n');
            $('header,.menu').addClass('blacked');
        } else {
            $(window).unbind('scroll');
            $('header,.menu').addClass('blacked');
        }
    }
    var slider_destroy = 1;

    function init_sec4() {
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;


        if (width <= 610) {
            if (slider_destroy == 1) {
                sec4_slider = $('.sec4_bx-wrap').bxSlider({
                    infiniteLoop: false,
                    controls: false,
                    pager: true,
                    pagerCustom: '.eli_gro',
                    auto: false,
                    speed: 500,
                    minSlides: 1,
                    maxSlides: 1,
                    moveSlides: 1,
                    onSlideNext: function($slideElement, oldIndex, newIndex) {},
                    onSlidePrev: function($slideElement, oldIndex, newIndex) {},
                    onSliderLoad: function() {}
                });
                slider_destroy = 0;
            }
        } else {
            if (typeof sec4_slider !== 'undefined') {
                sec4_slider.destroySlider();
                slider_destroy = 1;
            };
        }
    }




    function init_firts_block() {

        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        console.log('width=' + width);






        // detect if IE : from http://stackoverflow.com/a/16657946      
        var ie = (function() {
            var undef, rv = -1; // Return value assumes failure.
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            var trident = ua.indexOf('Trident/');

            if (msie > 0) {
                // IE 10 or older => return version number
                rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            } else if (trident > 0) {
                // IE 11 (or newer) => return version number
                var rvNum = ua.indexOf('rv:');
                rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
            }

            return ((rv > -1) ? rv : undef);
        }());


        // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179                  
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = [32, 37, 38, 39, 40],
            wheelIter = 0;

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }

        function keydown(e) {
            for (var i = keys.length; i--;) {
                if (e.keyCode === keys[i]) {
                    preventDefault(e);
                    return;
                }
            }
        }

        function touchmove(e) {
            preventDefault(e);
        }

        function touchstart(e) {
            preventDefault(e);
        }

        function wheel(e) {
            // for IE 
            //if( ie ) {
            //preventDefault(e);
            //}
        }

        function disable_scroll() {
            window.onmousewheel = document.onmousewheel = wheel;
            document.onkeydown = keydown;
            document.body.ontouchmove = touchmove;
            document.body.ontouchstart = touchstart;
        }

        function enable_scroll() {
            window.onmousewheel = document.body.ontouchstart = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
        }

        var docElem = window.document.documentElement,
            scrollVal,
            isRevealed,
            noscroll,
            isAnimating,
            container = document.getElementById('sec1');
        //trigger = container.querySelector( 'button.trigger' );

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        function scrollPage() {
            scrollVal = scrollY();

            if (noscroll && !ie) {
                if (scrollVal < 0) return false;
                // keep it that way
                window.scrollTo(0, 0);
            }

            if ($(container).hasClass('notrans')) {
                $(container).removeClass('notrans');
                return false;
            }

            if (isAnimating) {
                return false;
            }

            if (scrollVal <= 0 && isRevealed) {
                toggle(0);
            } else if (scrollVal > 0 && !isRevealed) {
                toggle(1);
            }
        }

        function toggle(reveal) {
            isAnimating = true;

            if (reveal) {
                $(container).addClass('sec1_n');
                $('header,.menu').addClass('blacked');
                //classie.add( container, 'modify' );
            } else {
                if (!isMobile) {
                    noscroll = true;
                }
                disable_scroll();
                $(container).removeClass('sec1_n');
                $('header,.menu').removeClass('blacked');
                //classie.remove( container, 'modify' );
            }

            // simulating the end of the transition:
            setTimeout(function() {
                isRevealed = !isRevealed;
                isAnimating = false;
                if (reveal) {
                    if (!isMobile) {
                        noscroll = false;
                    }
                    enable_scroll();
                }
            }, 600);
        }

        // refreshing the page...
        var pageScroll = scrollY();
        if (!isMobile) {
            noscroll = pageScroll === 0;
        }

        //disable_scroll();






        //trigger.addEventListener('click', function() {
        //    toggle('reveal');
        //});


        if (width >= 501) {


            if (pageScroll) {
                isRevealed = true;
                $(container).addClass('notrans');
                $(container).addClass('sec1_n');
                $('header,.menu').addClass('blacked');
                //classie.add( container, 'notrans' );
                //classie.add( container, 'modify' );
            }

            disable_scroll();

            //window.addEventListener('scroll',scrollPage,true);
            $(window).scroll(scrollPage);
            console.log('scrollPage_binded');

            accept_swipe = 1;

            $('#sec1').swipe({
                swipe: function(event, direction) {
                    if (direction == 'up' && $(window).scrollTop() == 0) {
                        if (accept_swipe == 1) {
                            toggle(1);
                        }
                        console.log('up');
                        //enable_scroll();
                    }
                    if (direction == 'down' && $(window).scrollTop() == 0) {
                        if (accept_swipe == 1) {
                            toggle(0);
                        }
                        console.log('down');
                        //enable_scroll();
                    }
                },
                allowPageScroll: "vertical",
                excludedElements: []
            });

        } else {


            $('header,.menu').addClass('blacked');

            $(window).unbind('scroll');
            console.log('scrollPage_unbinded');
            enable_scroll();
            $("#sec1").swipe("destroy");
            accept_swipe = 0;
        }
    }





    //inits
    if (!isMobile) {
        init_firts_block();
    } else {
        init_firts_block_mobile();
    }
    init_sec4();
    init_menu();


});
$(window).resize(function() {
    if (!isMobile) {
        init_firts_block();
    } else {
        init_firts_block_mobile();
    }
    init_sec4();
    init_menu();
    console.log('resize');
});
