'use strict';

angular.module('MyApp.controllers').controller('DashboardCtrl', 
  function($scope, $ionicLoading, locationFactory, $cordovaGeolocation, FIREBASE_ROOT, User) {

  var randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  $scope.init = function() {

    ionic.Platform.ready(function() {

      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coordinates = {
          "latitude": latitude,
          "longitude": longitude
        };
        var currentPosition = coordinates;
        var box = {
          "minX": currentPosition.longitude - 1,
          "minY": currentPosition.latitude - 1,
          "maxX": currentPosition.longitude + 1,
          "maxY": currentPosition.latitude + 1
        }

        User.recordGeolocation(box);

        //get the weather data
        locationFactory.getWeatherData(currentPosition).
        then(function(data) {
          $scope.weatherData = data.data;
          console.log(data.data);
          $scope.$apply();
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
          $scope.$apply();

        });

      });

    });

  }


  $ionicLoading.show({
    template: 'Loading...'
  });

  $scope.init();
  $scope.$apply();
  });
