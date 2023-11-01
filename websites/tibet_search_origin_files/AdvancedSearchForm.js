define([
    "jquery", "jquery/jquery-ui.min", "emuseum/ThesaurusTree", "jquery/jquery.ui.touch-punch.min"
], function($, jqueryUI, thestree) {
    var animationDuration = 300;

    return function(treeLoadUrl, treeSearchUrl) {
        // Date range
        var $dateSlider = $('#dateSlider');
        var updateSlider = function() {
            $dateSlider.slider("values", [
                parseInt($('#beginDate').val()), parseInt($('#endDate').val())
            ]);
        };
        $dateSlider.slider({
            range: true,
            min: parseInt($('#beginDate').attr('min')),
            max: parseInt($('#endDate').attr('max')),
            values: [
                parseInt($('#beginDate').val()), parseInt($('#endDate').val())
            ],
            step: 1,
            change: function(event, ui) {
                $('#beginDate').val(ui.values[0]);
                $('#endDate').val(ui.values[1]);
            },
            slide: function(event, ui) {
                $('#beginDate').val(ui.values[0]);
                $('#endDate').val(ui.values[1]);
            }
        });
        $('#beginDate').change(function(e) {
            updateSlider();
        });
        $('#endDate').change(function(e) {
            updateSlider();
        });

        // Thesaurus handling
        $('.em-thes-tree-search').on('keyup', function(e) {
            var element = $(this);
            if(element.val().length >= 3) {
                clearTimeout($.data(this, 'timer'));
                var delay = setTimeout(function() {
                    searchThesaurus(element);
                }, 500);
                $(this).data('timer', delay);
            }
        });
        thestree.onChanged(function(e, data) {
            if(data.node) {
                var ids = $('.jstree-clicked').map(function() {
                    return $(this).parents("li").attr('id');
                }).get().join();
                $(this).prevAll('.em-thes-tree-value').val(ids);
            }
        });
        thestree.onData(function(node) {
            return {
                'id': node.id
            };
        });
        thestree.onSearch(function(event, data) {
            if(data.nodes.length == 0) {
                $(this).prevAll('.tree-search-count').show(animationDuration);
            }
            else {
                $(this).prevAll('.tree-search-count').hide(animationDuration);
            }
            $(this).prevAll('.tree-search-spinner').hide(animationDuration);
        });
        thestree.create(treeLoadUrl, treeSearchUrl, $('.em-thes-tree'));

        var searchThesaurus = function(element) {
            var query = element.val();
            element.parent().nextAll('.tree-search-count').hide(animationDuration);
            element.parent().nextAll('.tree-search-spinner').show(animationDuration);
            var showOnlyMatches = element.nextAll('.tree-search-settings').find('.show-only-matches').prop('checked');
            thestree.search(element.parent().nextAll('.em-thes-tree'), query, showOnlyMatches);
        }
    }
});
