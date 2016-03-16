"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location) {

        var vm = this;

        function init() {
            vm.$location = $location;

            }
            init();


    }


})();