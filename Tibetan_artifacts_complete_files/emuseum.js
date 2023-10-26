define(
    [
        "jquery", "bootstrap/tab", "bootstrap/tooltip", "bootstrap/modal",
        "bootstrap/dropdown", "emuseum/Events", "emuseum/MediaZoom", "emuseum/IsoGrid"
    ],
    function($, tab, tooltip, modal, dropdown, Events, Zoom, iso) {

        // returns true if user is on a phone or tablet
        window.mobileAndTabletcheck = function() {
            var check = false;
            (function(a) {
                if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
                    .test(a)
                    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
                        .test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };

        // if mobile
        if(window.mobileAndTabletcheck()) {
            //remove selected state of multiselects before any other action is taken
            $('.advancedsearch-field-wrap select[multiple="multiple"]').each(function() {
                var multiSelect = $(this);
                multiSelect.find('option:selected').removeAttr("selected");
            });
            //Add class for touch devices
            $('body').addClass('em-touch-device-true');
            //Account for true viewport height for overlay
            $('.media-overlay').height(window.innerHeight);
            //Resize overlay height when orientation changed
            window.addEventListener("resize", function() {
                $('.media-overlay').height(window.innerHeight);
            }, false);
        }

        $('.trigger-iso-relayout').click(function() {
            setTimeout(function() {
                iso.relayout();
            }, 100);
        });

        $('body').on('contextmenu', '.disable-click', function(e) {
            return false;
        });

        $('[data-toggle="tooltip"]').tooltip();


        // Fix for tooltips on mobile devices
        $('[data-toggle="tooltip"]').bind('touchend', function(e) {
            if($(e.target).attr('rel') !== 'tooltip' && ($('div.tooltip.in').length > 0)) {
                $('[rel=tooltip]').mouseleave();
                e.stopPropagation();
            }
            else {
                $(e.target).mouseenter();
            }
        });



        $('.secondary-media-tabs li').each(function() {

            var tab = $(this);
            var tabs = tab.parent();
            var tabLink = tab.children();
            var tabRef = tabLink.attr('data-show-media');
            var tabContent = $('.secondary-media-content');

            tabLink.click(function(e) {
                e.preventDefault();
                $('.secondary-media-tabs li.active').removeClass('active');
                tab.addClass('active');
                tabContent.removeClass().addClass(tabRef + ' secondary-media-content');
                if($('#media-overlay').hasClass('secondary-media-closed')) {
                    $('#media-overlay').toggleClass('secondary-media-closed');
                    $('body').trigger(Events.TOGGLE_SECONDARY_MEDIA);
                }
            });

        });

        $('.secondary-media-toggle').click(function() {
            var map = Zoom.getMapElement();
            if(map) {
                map.fadeOut({
                    duration: 50,
                    complete: function() {
                        $('.detail-item-img').toggleClass('secondary-media-closed');
                        setTimeout(function() {
                            $('body').trigger(Events.TOGGLE_SECONDARY_MEDIA);
                        }, 300);
                    }
                });
            }
            else {
                $('.detail-item-img').toggleClass('secondary-media-closed');
            }
        });


        // Advanced search toggle click event handler
        $('#emuseum-advancedsearch-toggle').click(function() {
            $(this).toggleClass('toggle-open');
            $('.emuseum-advancedsearch-form').slideToggle();
        });

        if ($('.emuseum-advancedsearch-form').children('.alert-danger').length > 0){
            $('#emuseum-advancedsearch-toggle').trigger('click');
        }

        $('.disclaimer-dismiss').click(function() {
            var banner = $('.emuseum-disclaimer-banner');
            banner.fadeOut(function() {
                banner.remove();
            });
        });

        // detail dropdown fields
        $('.toggleField').each(function() {
            var field = $(this);
            var toggle = field.find('.toggleLabel');
            var content = field.find('.toggleContent');
            configActive = field.find('.emuseum-admin-submenu .active');
            toggle.click(function() {
                content.slideToggle();
                field.toggleClass('toggleFieldOpen');
            });
            if($(configActive).length > 0) {
                content.slideToggle();
                field.toggleClass('toggleFieldOpen');
            }
        });

        // Filter Dropdown
        $('.filter-group-toggle').each(
            function() {
                var field = $(this);
                var toggle = field.find('.toggleLabel');
                var content = field.next();
                toggle.click(function() {
                    if(($('body').hasClass('results-grid-one-column') && ($('.toggleFieldOpen').length > 0)
                        && !field.hasClass('toggleFieldOpen') && !field.hasClass('toggleFieldOpen'))
                        || ($(window).width() <= 768)) {

                        if(!field.hasClass('toggleFieldOpen')) {
                            $('.toggleFieldOpen').next().slideToggle();
                            $('.toggleFieldOpen').removeClass('toggleFieldOpen');
                            setTimeout(function() {
                                content.slideToggle();
                                field.addClass('toggleFieldOpen');
                            }, 200);
                        }
                        else {
                            content.slideToggle();
                            field.toggleClass('toggleFieldOpen');
                        }
                    }
                    else {
                        content.slideToggle();
                        field.toggleClass('toggleFieldOpen');
                    }
                });
            });

        var getParameters = function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        var filters = $('.filterVal');
        if(filters.length > 0) {
            filters.each(function() {
                $(this).val(getParameters('filter'));
            });
        }

        var pages = $('.pageVal');
        if(pages.length > 0) {
            pages.each(function() {
                $(this).val(getParameters('page'));
            });
        }

        var sorts = $('.sortVal');
        if(sorts.length > 0) {
            sorts.each(function() {
                $(this).val(getParameters('sort'));
            });
        }

        var idx = $('.idxVal');
        if(idx.length == 1) {
            $(idx[0]).val(getParameters('idx'));
        }

        //New Modal State Toggles
        $('.emuseum-search-toggle').click(function() {
            $('body').toggleClass('emuseum-search-modal-open');
            $('html').toggleClass('emuseum-modal-mode');
            if($(document.activeElement).attr('id') == 'quicksearch') {
                $('body').focus();
            }
            else {
                $('#quicksearch').focus();
            }
        });
        $('.emuseum-menu-toggle').click(function() {
            $('body').toggleClass('emuseum-mobile-menu-open');
            if($('.em-default-theme').length > 0) {
                $('html').toggleClass('emuseum-modal-mode');
            }
            $('.em-default-theme.emuseum-mobile-menu-open .emuseum-nav a').each(function(i) {
                $(this).hide().delay(100 * i).fadeIn(200);
            });
        });

        $('.emuseum-filter-toggle').click(function() {
            $('body').toggleClass('emuseum-mobile-filter-mode');
            $('html').toggleClass('emuseum-modal-mode');
        });

        //Grid Item fade effect
        setTimeout(function() {
            $('.emuseum-img-grid .grid-item').addClass('grid-item-fade');
        }, 50);

        //Masonry percentage rounding misalignment
        if(document.querySelector('.emuseum-masonry-grid .emuseum-img-grid') !== null) {
            $('html').addClass('html-masonry');
        }

        //Add Filter Count as class for Horizontal CSS Grid use
        var numFilters = $('.results-grid-one-column .filter-inner .filter-group').length;
        $('.filter-inner').addClass('filter-count-' + numFilters);

        // Fade Readmore
        $('.em-text-long').each(function() {
            var longText = $(this);
            var readMore = longText.find('.em-read-more');
            readMore.click(function() {
                longText.toggleClass('em-text-long-open');
            });
            $(readMore).keypress(function(ev) {
                if(ev.which === 13) $(readMore).click();
            });
        });

        //Back to Top Button
        var backToTop = $('#em-back-to-top');
        $(window).scroll(function() {
            if($(window).scrollTop() > 500) {
                backToTop.addClass('back-to-top-visible');
            }
            else {
                backToTop.removeClass('back-to-top-visible');
            }
        });

        backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, '300');
        });
        
        //Move emuseum bootstrap modals to inside of body to avoid being hidden if parents have z-index value
        $('.emuseum-main-wrap .modal').appendTo('body');
    });
