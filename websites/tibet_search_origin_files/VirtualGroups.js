define([
    "jquery"
], function($) {
    var handleUrl = function(formId) {
        var regex = new RegExp($('#' + formId + ' #url').attr('pattern'), 'g');

        $('#' + formId + ' #name').on('keyup', function(e) {
            $('#' + formId + ' #url').val(convertValueToURL($(this).val(), regex));
        });
    };

    var convertValueToURL = function(value, regex) {
        var url = "";
        for(var i=0; i<value.length; i++) {
            if(value[i].match(regex)) {
                url += value[i];
            }
            else {
                url += '-';
            }
        }

        return url.toLowerCase();
    };

    return {
        handleUrl: handleUrl,
        convertValue: convertValueToURL
    };
});
