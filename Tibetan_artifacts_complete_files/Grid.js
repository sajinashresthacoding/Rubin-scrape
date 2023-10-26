define([
    "jquery", "jquery/imagesloaded.pkgd.min"
], function($, imagesLoaded) {
    var grid;

    var init = function() {
        grid = $('.emuseum-img-grid');
        if(isGrid()) {
            loadImages(grid);
        }

        // Guard against pages without grid elements
        if(grid.length < 1) {
            return;
        }
    }

    var isGrid = function() {
        if(grid) {
            return (grid.length > 0);
        }

        return false;
    };

    var appendItems = function(newItems) {
        grid.append(newItems);
        loadImages(newItems);
    };

    var loadImages = function(element) {
        element.imagesLoaded().progress(function(instance, image) {
            $(image.img).parents(".grid-item").addClass('grid-item-loaded');
        });
    };

    return {
        isGrid: isGrid,
        init: init,
        appendItems: appendItems
    };
});
