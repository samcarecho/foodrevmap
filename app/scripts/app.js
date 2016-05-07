/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    document.querySelector("google-map").addEventListener("google-map-ready",initialize);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onDataRouteClick = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    document.getElementById('mainContainer').scrollTop = 0;
  };

  app.markers = [
    ['FRD Campinas', -22.894030, -47.067061, 1],
    ['FRD Lima', -12.0553017,-77.0626949, 1],
    ['FRD São Paulo', -23.6815315,-46.8754833, 1],
    ['FRD Buenos Aires', -34.603796, -58.384867, 1],
    ['FRD Montevideo', -34.900513, -56.169303, 1],
    ['FRD Santiago', -33.449796, -70.666917, 1]
  ];

  app.markerImage = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    //size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    //origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    //anchor: new google.maps.Point(0, 32)
  };

  app.markerStyle = {
    url: '/images/markerCluster.png',
    width: "48px",
    height: "48px",
    textColor: 'red',
    textSize: "10px"
  };

  function initialize() {
    var map = document.querySelector("google-map");
    var clusterer = document.querySelector("google-map-markerclusterer");
    var markers = [];
    for (var i = 0; i < app.markers.length; i++) {
      var markerData = app.markers[i];
      var latLng = new google.maps.LatLng(markerData[1],
        markerData[2]);
      var marker = new google.maps.Marker({
        position: latLng
      });
      markers.push(marker);
    }
    clusterer.map = map.map;
    clusterer.markers = markers;
  }

})(document);
