var app = angular.module('personApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/list", {
                templateUrl: "views/person/list.html",
                controller: "ViewController"
            })
            .when("/details/:id", {
                templateUrl: "views/person/details.html",
                controller: "ViewController"
            })
            .when("/new", {
                templateUrl: "views/person/new.html",
                controller: "PersonController"
            })
            .otherwise({
                redirectTo: "/list"
            });
});
var persons = [
    {id: 1, name: "Jens", age: 18}
    , {id: 2, name: "Peter", age: 23}
    , {id: 3, name: "Hanne", age: 23}
];
var nextId = 4;

app.controller('PersonController', function ($scope, $window) {
    $scope.persons = persons;
    $scope.save = function () {
        $scope.newPerson.id = nextId++;
        persons.push($scope.newPerson);
        $window.location.href = '#/list';
    };
});

app.controller('ViewController', function ($scope, $routeParams, $log) {
    $scope.persons = persons;
    if (angular.isDefined($routeParams.id)) {
        for (var i in persons) {
            if(persons[i].id == $routeParams.id){
                $scope.person = persons[i];
            }
        }
    }
});