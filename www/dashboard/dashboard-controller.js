'use strict';

angular.module('MyApp.controllers').controller('DashboardCtrl', 
  function($scope, $ionicLoading, locationFactory, $cordovaGeolocation, User) {

  var randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  $scope.sendTofu = function() {
    var timestamp = new Date().getTime();
    console.log("tofu sent!");
    User.recordTofu(timestamp);
  };
  
  $scope.init = function() {

    ionic.Platform.ready(function() {

      navigator.geolocation.watchPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coordinates = {
          "latitude": latitude,
          "longitude": longitude
        };
        var currentPosition = coordinates;
        console.log(currentPosition);
        User.recordGeolocation(currentPosition);

      });

      var partnerInfo = User.getUserPartner();
      var partnerPosition = partnerInfo.geo;
      $scope.partnerInfo = partnerInfo;
      var box = {
        "minX": partnerPosition.longitude - 1,
        "minY": partnerPosition.latitude - 1,
        "maxX": partnerPosition.longitude + 1,
        "maxY": partnerPosition.latitude + 1
      }

      //get the weather data
      locationFactory.getWeatherData(partnerPosition).
      then(function(data) {
        $scope.weatherData = data.data;
        console.log(data.data);
      })

      //get the background image
      locationFactory.getBackgroundImage(box).
      then(function(data) {
        var imageNum = randomIntFromInterval(1, 9);

        $scope.backgroundImage = data.data;
        $scope.heroImage = {
          'background-image': 'url(' + $scope.backgroundImage.photos[imageNum].photo_file_url + ')'
        };
        $ionicLoading.hide();

      });

    });

  }


  $ionicLoading.show({
    template: 'Loading...'
  });

  $scope.init();
  });
