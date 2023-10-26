define([
    "jquery", "jquery/jstree.min"
], function($, jstree) {
    var clickHandler;
    var changedHandler;
    var dataHandler;
    var searchHandler;


    registerClickHandler = function(handler) {
        clickHandler = handler;
    }

    registerChangedHandler = function(handler) {
        changedHandler = handler;
    }

    registerDataHandler = function(handler) {
        dataHandler = handler;
    }

    registerSearchHandler = function(handler) {
        searchHandler = handler;
    }


    /**
     * Create the tree on the given element.
     *
     * @param   {string}  treeLoadUrl   URL to load tree from (JSON response)
     * @param   {string}  treeSearchUrl URL to search for tree nodes (JSON response)
     * @param   {string}  treeElement   DOM-element to create tree on
     */
    createTree = function(treeLoadUrl, treeSearchUrl, treeElement) {
        // Destroy old tree
        if(treeElement.jstree) {
            treeElement.jstree("destroy");
        }

        // Create new tree
        treeElement.jstree({
            'core': {
                'multiple': false,
                'themes': {
                    'icons': false,
                    'dots': false
                },
                'data': {
                    'url': treeLoadUrl,
                    'data': function(node) {
                        if(dataHandler) {
                            var result = dataHandler(node);
                            if(result) {
                                return result;
                            }
                        }
                        return {
                            'id': node.id
                        };
                    }
                }
            },
            'plugins': [
                'search',
                'sort'
            ],
            'search': {
                'show_only_matches': false,
                'ajax': {
                    'url': treeSearchUrl
                },
                'search_callback': function(query, node) {
                    return (node.text.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                }
            }
        }).on('click', clickHandler).on('changed.jstree', changedHandler).on('search.jstree', searchHandler);
    }


    /**
     * Search for nodes on the given tree.
     *
     * @param   {string}  treeElement       DOM-element of tree to search on
     * @param   {string}  query             Search query
     * @param   {string}  showOnlyMatches   Whether or not to show only matching notes
     */
    searchTree = function(treeElement, query, showOnlyMatches) {
        treeElement.jstree(true).search(query, false, showOnlyMatches);
    }


    /**
     * Public functions
     */
    return {
        onClick: registerClickHandler,
        onChanged: registerChangedHandler,
        onData: registerDataHandler,
        onSearch: registerSearchHandler,
        create: createTree,
        search: searchTree
    };
});
