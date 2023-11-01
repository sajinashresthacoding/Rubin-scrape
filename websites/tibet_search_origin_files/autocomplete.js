(function() {
  define(["./dom", "./ajax", "underscore", "jquery", "./utils", "./typeaheadgs"], function(dom, ajax, _, $, arg) {
    var exports, extendURL, init;
    extendURL = arg.extendURL;
    init = function(spec) {
      var $field, dataset, engine;
      $field = $(document.getElementById(spec.id));
      engine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: spec.limit,
        remote: {
          url: spec.url,
          replace: function(uri, query) {
            return extendURL(uri, {
              "t:input": query
            });
          },
          filter: function(response) {
        	return _.map(
			  response.matches,
			  function(m) {
			    return m.indexOf(' ') > -1 ? '"' + m + '"' : m;
              }
		    );
          }
        },
        sorter:function(a, b) { 
	        //get input text
	        var InputString = $field.val();
	
	        //move exact matches to top
	        if(InputString == a) {
	        	return -1;
        	}
	        if(InputString == b){
	        	return 1;
        	}
	
	        if((InputString!=a) && (InputString!=b)){
	
	             if (a < b) {
	                return -1;
	             }
	             else if (a > b) {
	                return 1;
	             }
	             else return 0;
	        }
        }
      });
      engine.initialize();
      dataset = {
        name: spec.id,
        displayKey: _.identity,
        source: engine.ttAdapter()
      };
      $field.typeahead({
        minLength: spec.minChars
      }, dataset);
      $field.prev(".tt-hint").removeAttr("data-validation data-optionality data-required-message");
    };
    return exports = init;
  });

}).call(this);
