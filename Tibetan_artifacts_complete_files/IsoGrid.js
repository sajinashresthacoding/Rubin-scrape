define([
    "jquery", "jquery/isotope.pkgd.min", "jquery/imagesloaded.pkgd.min"
], function($, Isotope, imagesLoaded) {
    var grid;
    var iso;

    var init = function() {

        grid = $('.emuseum-masonry-grid .emuseum-img-grid');
        // Guard against pages without isogrid elements
        if(isIsogrid()) {
            grid.addClass('isoGrid');

            iso = new Isotope('.emuseum-masonry-grid .emuseum-img-grid', {
                itemSelector: '.grid-item',
                hiddenStyle: {
                    opacity: 0
                },
                visibleStyle: {
                    opacity: 1
                },
                transitionDuration: '0.65s',
                stagger: 55
            });

            loadImages(grid);
        }
    };

    var isIsogrid = function() {
        if(grid) {
            return (grid.length > 0);
        }

        return false;
    };

    var remove = function(item) {
        iso.remove(item);
        iso.layout();
    };

    var relayout = function() {
        iso.layout();
    };

    var appendItems = function(newItems) {
        iso.appended(newItems);
        loadImages(newItems);
    };

    var loadImages = function(element) {
        element.imagesLoaded().progress(function(instance, image) {
            $(image.img).parents(".grid-item").addClass('iso-grid-item-loaded');
            relayout();
        }).done(function() {
            grid.addClass('iso-grid-loaded');
            relayout();
        });
    };

    return {
        isIsogrid: isIsogrid,
        init: init,
        relayout: relayout,
        remove: remove,
        appendItems: appendItems
    };
});
