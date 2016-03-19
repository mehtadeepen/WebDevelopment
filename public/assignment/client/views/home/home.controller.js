"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($location) {

        var vm = this;

        function init() {
            vm.$location = $location;

        }
        init();


    }


})();