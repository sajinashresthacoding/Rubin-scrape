define(["jquery", "emuseum/Events", "openlayers/ol"],function($, Events, ol) {
    var mapId = 'map';

    var getMap = function() {
        var mapElement = self.getMapElement();
        if(mapElement) {
            return mapElement.data('map');
        }
    };

    var resizeMap = function() {
        var map = getMap();
        if(map) {
            self.getMapElement().fadeIn({
                duration: 50
            });
            map.updateSize();
        }
    };

    var fitMap = function(extent) {
        var map = getMap();
        if(map) {
            // Make map tiles fit to container div
            map.getView().fit(extent, {size: map.getSize(), constrainResolution: false});
        }
    };

    var resizeHandler = function() {
        resizeMap();
    }
    var fitHandler = function(e) {
        fitMap(e.data.extent);
    }

    var self = {
        getMap: getMap,
        getMapElement: function() {
            return $('#'+mapId);
        },
        getMapId: function() {
            return mapId;
        },
        init: function(width, height, zoomBaseUrl, tileSize) {
            var mapElement = self.getMapElement();
            if(mapElement) {
                var iiifTileSource = new ol.source.IIIF( {
                    format: 'jpg',
                    quality: 'default',
                    resolutions: [8, 4, 2, 1],
                    size: [width, height],
                    supports: [
                        "regionByPx",
                        "regionByPct",
                        "sizeByW",
                        "sizeByH",
                        "sizeByPct",
                        "sizeByConfinedWh",
                        "sizeByDistortedWh",
                        "sizeByWh"
                    ],
                    tileSize: [tileSize, tileSize],
                    url: zoomBaseUrl,
                    version: ol.format.IIIFInfo.VERSION2,
                    zDirection: -1
                });

                var map = new ol.Map({
                    target: mapId,
                    controls: [
                        new ol.control.Zoom(),
                        new ol.control.OverviewMap()
                    ],
                    layers: [
                        new ol.layer.Tile({
                            source: iiifTileSource
                        })
                    ],
                    view: new ol.View({
                        resolutions: iiifTileSource.getTileGrid().getResolutions(),
                        extent: iiifTileSource.getTileGrid().getExtent(),
                        constrainOnlyCenter: true
                    })
                });
                mapElement.data('map', map);

                // Make sure map is zoomed to fit entire space
                fitMap(iiifTileSource.getTileGrid().getExtent());

                // Adjust map on events
                $('body').off(Events.TOGGLE_SECONDARY_MEDIA, resizeHandler);
                $('body').on(Events.TOGGLE_SECONDARY_MEDIA, resizeHandler);
                $('body').off(Events.TOGGLE_MEDIA_OVERLAY, resizeHandler);
                $('body').on(Events.TOGGLE_MEDIA_OVERLAY, resizeHandler);
                $('body').off(Events.TOGGLE_MEDIA_OVERLAY, fitHandler);
                $('body').on(
                    Events.TOGGLE_MEDIA_OVERLAY, {
                        extent: iiifTileSource.getTileGrid().getExtent()
                    },
                    fitHandler
                );
                $(window).resize(resizeHandler);
            }
        }
    };

    return self;
});
