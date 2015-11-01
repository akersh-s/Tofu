'use strict';

angular.module('MyApp.services')

  .service('locationFactory', function($http, $q, FIREBASE_ROOT, User) {
    
    this.getBackgroundImage = function(box) {
      var baseUrl = 'http://www.panoramio.com/map/get_panoramas.php?callback=JSON_CALLBACK&set=public&from=0&to=10' +
        '&minx=' + box.minx +
        '&miny=' + box.miny +
        '&maxx=' + box.maxx +
        '&maxy=' + box.maxy +
        '&size=original&mapfilter=true';
      console.log(baseUrl);
      return $http.jsonp(baseUrl).
      success(function(data, status, headers, config) {}).
      error(function(data, status, headers, config) {
        alert('woops:' + JSON.stringify(status));
      });
    };

    this.getWeatherData = function(currentPosition) {
      var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?' +
        'lat=' + currentPosition.latitude +
        '&lon=' + currentPosition.longitude + '&APPID=9098c727575b596934c96a9da189b621';
      console.log(baseUrl);
      return $http.get(baseUrl).
      success(function(data, status, headers, config) {}).
      error(function(data, status, headers, config) {
        alert('woops:');
      });
    };

  })