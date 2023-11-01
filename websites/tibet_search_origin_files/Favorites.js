define([
    "jquery", "emuseum/IsoGrid"
], function($, IsoGrid) {
    /**
     * Add by stars
     */
    var itemIds = [];
    var myCollectionToggle = $('.mycollection-toggle');
    var myCollectionRemove = $('.mycollection-remove');
    var collectionAddingClass = 'mycollections-adding';
    var body = $('body');

    myCollectionRemove.click(function() {
        var icon = $(this);
        var itemId = icon.parents('.grid-item-toolbar').find(myCollectionToggle).attr('data-emuseum-id');
        var idx = itemIds.indexOf(itemId);
        if(idx != -1) {
            itemIds.splice(idx, 1);
            if(itemIds == 0) {
                body.removeClass(collectionAddingClass);
            }
        }

        // Submit form to remove item
        icon.parents('form').submit();

        // Remove Item and relayout the masonry grid
        if($('.emuseum-img-grid.isoGrid').length > 0) {
            IsoGrid.remove(icon.parents('.item').remove());
        } else {
            icon.parents('.item').remove();
        }
    });
});
