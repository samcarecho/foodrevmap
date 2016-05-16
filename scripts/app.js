/*jshint loopfunc: true */

(function(document) {
  'use strict';


  var app = document.querySelector('#app');

  app.viewportW = window.innerWidth;
  app.viewportH = window.innerHeight;

  console.log(app.viewportW);
  console.log(app.viewportH);

  if (app.viewportW >= 1024) {
    app.viewportW = 1024;
    app.viewportH = 768;
  }

  // Sets app default base URL
  app.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };


  app.addEventListener('dom-change', function() {
    //console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {

    window.scrollTo(0,1);

    //app.mapsAPI = document.querySelector('google-maps-api');
    //app.mapsAPI.addEventListener('api-load', function() {
    //  //this.api === google.maps;
    //
    //
    //});

    app.ajaxEl = Polymer.dom(document).querySelector('#getMarkersData');
    app.ajaxEl.onResponse = app.onDataResponse;
    app.ajaxEl.generateRequest();
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.closeDrawer = function() {
    app.$.paperDrawerPanel.closeDrawer();
  };

  navigator.geolocation.getCurrentPosition(function(position) {
    app.lat = position.coords.latitude;
    app.lng = position.coords.longitude;
  });

  if (app.lat === undefined || app.lng === undefined) {
    app.lat = 51.583836;
    app.lng = -0.398943;
  }

  app.reloadPage = function() {
    document.location.reload(true);
  };

  app.mapZoom = 3;

  app.initialize = function() {
    console.log('map init');
    var map = document.querySelector('google-map');
    //console.log(map);
    var clusterer = document.querySelector('google-map-markerclusterer');
    var markers = [];
    var imageUrl = 'images/marker.png';
    var markerImage = new google.maps.MarkerImage(imageUrl,
      new google.maps.Size(48, 73));

    var markerClick = function(marker, infoWindow) {
      return function() {
        infoWindow.open(map.map, marker);
      };
    };

    if (app.markers) {
      for (var i = 0; i < app.markers.length; i++) {
        var markerData = app.markers[i];

        var infoEl =  document.createElement('marker-info-window');
        infoEl.marker = markerData;
        var contentString;
        contentString = infoEl;


        var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

        //console.log(infoWindow);

        var latLng = new google.maps.LatLng(markerData.lat,
          markerData.lng);

        var marker = new google.maps.Marker({
          position: latLng,
          map: map.map,
          icon: markerImage
        });

        marker.addListener('click', (markerClick)(marker, infoWindow));


        markers.push(marker);
      }
    }

    clusterer.map = map.map;
    clusterer.markers = markers;
    app.cMarkers = markers;
  };

  app.onDataResponse = function(event) {
    app.markers = event.detail.response;
    document.querySelector('google-map').addEventListener('google-map-ready',app.initialize);
  };

  //app.markers = null;

  app.markerStyle = [{
    url: 'images/markerCluster.png',
    width: '64px',
    height: '64px',
    anchorText: ['11px', '4px'],
    anchorIcon: ['64px', '48px'],
    textColor: '#000',
    textSize: '16px'
  }];

})(document);
