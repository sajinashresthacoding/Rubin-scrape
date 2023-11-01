define([
    "jquery", "emuseum/FavoritesChooser", "emuseum/IsoGrid", "emuseum/Grid", "jquery/infinitescroll.min", "jsURI/Uri"
], function($, FavoritesChooser, IsoGrid, Grid, infinitescroll, Uri) {
    var $results = $($('#timagesview')[0] || $('#tableView')[0] || $('#tlistview')[0]);
    var $list = $($('#tlistview > tbody:last-child')[0] || $('.emuseum-list-grid')[0]);
    var $itemSelector = $('#tableView')[0] ? '.results-grid tr.item' : '.results-grid div.item';
    var pgClass = 'pg' + new Uri($('div#scroll-pager a:first').attr('href')).getQueryParamValue("page");

    var init = function(loadingText, finishedText) {
        $results.infinitescroll({
            navSelector: "div#scroll-pager",
            nextSelector: "div#scroll-pager a:first",
            itemSelector: $itemSelector,
            loading: {
                msgText: loadingText,
                finishedMsg: finishedText
            },
            animate: false,
            extraScrollPx: 0,
            bufferPx: (($(window).height() * 0.5) + $(window).scrollTop())
        }, function(newElements) {
            $($(newElements).find('.mcbar')).addClass(pgClass);
            if(IsoGrid.isIsogrid()) {
                IsoGrid.appendItems(jQuery(newElements));
            }
            else if(Grid.isGrid()) {
                Grid.appendItems(jQuery(newElements));
            }
            else {
                $list.append(newElements);
            }

            // For Favorites toggle/functions
            FavoritesChooser.initFavoritesHandler(
                $(newElements).find('.mycollection-toggle'),
                $(newElements).find('.mycollection-remove')
            );

            // For AddToAny
            if(typeof a2a !== "undefined") {
                a2a.init_all()
            }
        });
    };

    return {
        init: init
    }
});
