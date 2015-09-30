'use strict';

angular.module('MyApp.services').service('User',
  function($q, $firebase, FIREBASE_ROOT, Auth, $cordovaLocalNotification) {
    var usersRef = new Firebase(FIREBASE_ROOT + '/users');
    var currentUser = null;
    var userPartner = null;

    this.getCurrentUser = function() {
      return currentUser;
    };

    this.getUserPartner = function() {
      return userPartner;
    }

    this.loadCurrentUser = function() {
      var defer = $q.defer();
      var currentUserRef = usersRef.child(Auth.currentUser.uid);

      currentUser = $firebase(currentUserRef);
      currentUser.$on('loaded', defer.resolve);

      return defer.promise;
    };

    this.loadUserPartner = function() {
      var defer = $q.defer();
      var partnerUserRef = usersRef.child(currentUser.key);
      userPartner = $firebase(partnerUserRef);
      userPartner.$on('loaded', defer.resolve);
 
      return defer.promise;
    };

    this.create = function(id, email) {
      var users = $firebase(usersRef);

      return users.$child(id).$set({ email: email });
    };

    this.generateSecret = function() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      };
          
      return text;
    };

    this.listenForTofu = function() {
      currentUser.$on("child_changed", function(snapshot) {
        console.log(snapshot);
        console.log("received tofu!");
        $cordovaLocalNotification.add({
          title: "Hi " + currentUser.name + ",",
          message: userPartner.name + " is thinking of you."});
      });
    }

    this.recordPasswordChange = function() {
      var now = Math.floor(Date.now() / 1000);
      
      return currentUser.$update({ passwordLastChangedAt: now });
    };

    this.recordGeolocation = function(box) {

      return currentUser.$update({geo: box});
    };

    this.recordTofu = function(timestamp) {

      return userPartner.$update({tofu: timestamp});
    };

    this.hasChangedPassword = function() {
      return angular.isDefined(currentUser.passwordLastChangedAt);
    };
  });
