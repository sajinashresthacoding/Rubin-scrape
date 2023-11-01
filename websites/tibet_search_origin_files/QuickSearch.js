define([
    "jquery", "underscore", "t5/core/typeaheadgs"
], function($, _) {
    $('#quicksearchsuggest').on('keydown', function(evt) {
        var keycode = (evt.keyCode ? evt.keyCode : evt.which);
        if(keycode == 13) {
            $('#quicksearchsuggest').trigger('typeahead:selected');
        }
    });

    $('#quicksearchsuggest').on('typeahead:selected', function(event, suggestion, dsname) {
        var val = (suggestion ? suggestion : $(this).val());
        if(val) {
            $('#searchForm').submit();
        }
    });
});
