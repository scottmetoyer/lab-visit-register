var app = angular.module('app', ['mgo-angular-wizard']);

app.controller('MainController', function MainController($scope) {
  var self = this;

  self.reasonForVisit = {};
  self.reasonsForVisit = [
    '3D Printing',
    'Consultation',
    'Tour',
    'Workshop',
    'Working on a project'];

  self.save = function() {
    console.log('saved');
  }
});