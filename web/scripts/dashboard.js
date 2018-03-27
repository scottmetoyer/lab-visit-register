var app = angular.module('dashboard', []);
var env = {};

if (window) {
  Object.assign(env, window.__env);
}
app.constant('__env', env);
app.controller('DashboardController', function DashboardController($scope, $http, $timeout, __env) {
  var self = this;
  var urlBase = __env.apiUrl;

  self.visit = {
    visitor: '',
    reasonForVisit: ''
  };

  self.reasonsForVisit = [
    { title: '3D Printing', icon: 'ion-printer' },
    { title: 'Consultation', icon: 'ion-chatboxes' },
    { title: 'Tour', icon: 'ion-map' },
    { title: 'Workshop', icon: 'ion-settings' },
    { title: 'Project', icon: 'ion-cube' }
  ];

  self.setReasonForVisit = function (reason) {
    self.visit.reasonForVisit = reason.title;
    console.log(self.visit);
    save();
  }

  self.reset = function () {
    document.location.href = "/";
  }

  function save() {
    $http.post(
      urlBase + "/visits",
      JSON.stringify(self.visit)
    ).then(function (response) {
      $timeout(function () {
        self.reset();
      }, 2000);
    }, function (error) {
      console.log(error);
    });
  }
});