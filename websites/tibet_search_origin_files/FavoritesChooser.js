define([
    "jquery", "t5/core/zone", "t5/core/events", "underscore", "emuseum/IsoGrid"
], function($, zoneManager, events, _, IsoGrid) {
    var ids = [];
    var selectedToggleClass = 'toggled';
    var selectionLink = $('.dropdown-item').last();

    var init = function() {
        initFavoritesHandler($('.mycollection-toggle'));
    };

    var initFavoritesHandler = function(items, deleteItems) {
        $.each(items, function(i, item) {
            var item = $(item);
            item.click(function() {
                if(item.hasClass(selectedToggleClass)) {
                    removeItem(this);
                    item.removeClass(selectedToggleClass);
                }
                else {
                    item.addClass(selectedToggleClass);
                    addItem(this);
                }
            });
        })
        $.each(deleteItems, function(i, deleteItem) {
            var $deleteItem = $(deleteItem);
            $deleteItem.click(function() {
                var r = $(this);
                r.parents('form').submit();
                IsoGrid.remove(r.parents('.item').remove());
            });
        })
    };

    var addItem = function(item) {
        var id = $(item).data('emuseum-id');
        var currentVal = getCurrentVal();
        if(currentVal) {
            ids = currentVal.split(',');
            ids.push(id);
        }
        else {
            ids.push(id);
        }
        $('.selectedObjects').each(function() {
            $(this).val(ids.join(','));
        });
        hasSelections();
    };

    var removeItem = function(item) {
        ids = _.without(getCurrentVal().split(','), $(item).data('emuseum-id').toString());
        $('.selectedObjects').each(function() {
            $(this).val(ids.join(','));
        });
        hasSelections();
    };

    var getCurrentVal = function() {
        return $($('.selectedObjects')[0]).val();
    };

    var hasSelections = function() {
        if(ids && ids.length > 0) {
            selectionLink.removeClass('inactiveLink');
        }
        else {
            selectionLink.addClass('inactiveLink');
        }
    }

    $('div[id^="addToFavoritesZone"]').on(events.zone.didUpdate, function(event) {
        if(event.target.toString().startsWith(this.toString())) {
            $('.mycollection-toggle.toggled').removeClass('toggled');
            ids = [];
            $($('.selectedObjects')[0]).val('');
            hasSelections();
        }
    });

    return {
        ids: ids,
        init: init,
        initFavoritesHandler: initFavoritesHandler
    }
});
