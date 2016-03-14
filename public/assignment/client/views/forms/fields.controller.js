"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($location, FormService, FieldService, $routeParams, UserService) {

        var vm = this;

        function init() {
            vm.$location = $location;
            vm.fields = [];
            vm.fieldType = -1;
            vm.form={};
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

            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    vm.user = currentUser;
                });

        }

        init();
        vm.addField = addField;
        vm.deleteField = deleteField;

        function addField(fieldType) {
            if(fieldType > 5 || fieldType < 0) {
                return;
            } else {
                FieldService.addField(fieldType, vm.form._id, vm.user._id).then(function(response){
                    if(response.data) {
                        vm.fields = response.data;
                    }
                });
            }
        }

        function deleteField(fieldId) {
            FieldService.deleteField(fieldId,vm.form._id).then(function(response){
                if(response.data) {
                    vm.fields = response.data;
                }
            });
        }
    }


})();