'use strict';

angular.module('MyApp.services').service('User',
  function($q, $firebase, FIREBASE_ROOT, Auth) {
    var usersRef = new Firebase(FIREBASE_ROOT + '/users');
    var currentUser = null;

    this.getCurrentUser = function() {
      return currentUser;
    };

    this.loadCurrentUser = function() {
      var defer = $q.defer();
      var currentUserRef = usersRef.child(Auth.currentUser.uid);
      
      currentUser = $firebase(currentUserRef);
      console.log(currentUser);
      currentUser.$on('loaded', defer.resolve);

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

    this.recordPasswordChange = function() {
      var now = Math.floor(Date.now() / 1000);
      
      return currentUser.$update({ passwordLastChangedAt: now });
    };

    this.recordGeolocation = function(box) {

      return currentUser.$update({geo: box});
    };

    this.hasChangedPassword = function() {
      return angular.isDefined(currentUser.passwordLastChangedAt);
    };
  });
