define([
    "jquery", "jquery/jquery-ui.min", "emuseum/ThesaurusTree", "jsURI/Uri", "jquery/jquery.ui.touch-punch.min"
], function($, jqueryUI, thestree, Uri) {
    /**
     * Filter handling methods
     */
    var filters = {};
    var parseFilters = function() {
        var filter = new Uri(location.href).getQueryParamValue('filter');
        if(filter) {
            $.each(filter.split(';'), function(i, item) {
                var key = item.split(':')[0];
                var values = [];
                $.each(item.split(':')[1].split(','), function(j, value) {
                    values.push(value);
                });
                filters[key] = values;
            });
        }
    }
    var clearFilter = function(key) {
        if(key in filters) {
            delete filters[key];
        }
    }
    var addFilterValue = function(key, value) {
        if(!(key in filters)) {
            filters[key] = [];
        }
        filters[key].push(value);
    };
    var applyFilters = function() {
        var filter = [];
        $.each(filters, function(key, values) {
            filter.push(key + ':' + values.join(','));
        })
        filter = filter.join(';');

        var url = new Uri(location.href).replaceQueryParam('filter', filter).deleteQueryParam('page');
        open(url.toString(), '_self');
    };

    var initFilters = function(treeLoadUrl) {
        parseFilters();

        // Date filter
        var $dateFilter = $('#dateFilter');
        var updateSlider = function() {
            $dateFilter.slider("values", [
                parseInt($('#beginDateFilter').val()), parseInt($('#endDateFilter').val())
            ]);
        };
        if($dateFilter) {
            var minDate = parseInt($dateFilter.attr('data-date-min'));
            var maxDate = parseInt($dateFilter.attr('data-date-max'));
            $dateFilter.slider({
                range: true,
                min: minDate,
                max: maxDate,
                values: [
                    parseInt($('#beginDateFilter').val()), parseInt($('#endDateFilter').val())
                ],
                step: 1,
                change: function(event, ui) {
                    $('#beginDateFilter').val(ui.values[0]);
                    $('#endDateFilter').val(ui.values[1]);
                },
                slide: function(event, ui) {
                    $('#beginDateFilter').val(ui.values[0]);
                    $('#endDateFilter').val(ui.values[1]);
                }
            });
            $('#beginDateFilter').change(function(e) {
                updateSlider();
            });
            $('#endDateFilter').change(function(e) {
                updateSlider();
            });
            $('#dateFilterForm').submit(function(e) {
                e.preventDefault();
                clearFilter('date');
                addFilterValue('date', $('#beginDateFilter').val());
                addFilterValue('date', $('#endDateFilter').val());
                applyFilters();
            });
        }

        // Thesaurus filter
        var thesaurusFilter = $('#thesfilterTree');
        if(thesaurusFilter) {
            thestree.onChanged(function(e, data) {
                if(data.node) {
                    var conceptId = data.node.id;
                    clearFilter('thesfilter');
                    addFilterValue('thesfilter', conceptId);
                    applyFilters();
                }
            });
            thestree.create(treeLoadUrl, null, thesaurusFilter);
        }
    };

    return {
        'initFilters': initFilters
    };
});
