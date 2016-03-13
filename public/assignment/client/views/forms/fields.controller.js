"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($location, FormService, FieldService, $routeParams) {

        var vm = this;

        function init() {
            vm.$location = $location;
            vm.fields = [];
            if($routeParams.formId) {
                FieldService.findAllFieldsForForm($routeParams.formId).then(function(response){
                    if(response.data) {
                        vm.fields = response.data;
                    }
                });

                FormService.findFormById($routeParams.formId).then(function(response){
                    if(response.data) {
                        vm.form = response.data;
                    }
                });
            }

        }

        init();
    }


})();