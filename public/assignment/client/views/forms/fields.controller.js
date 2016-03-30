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
                FieldService.findAllFieldsForForm($routeParams.formId).then(
                    function(response){
                        if(response.data) {
                            console.log(response.data);
                            vm.fields = response.data.fields;
                        }
                    }, function (error) {
                        console.log(error);
                    });

                FormService.findFormById($routeParams.formId).then(
                    function(response){
                        if(response.data) {
                            vm.form = response.data;
                        }
                    }, function (error) {
                        console.log(error);
                    }
                );
            }

            UserService.getCurrentUser().then(
                function(response) {
                    var currentUser = response.data;
                    vm.user = currentUser;
                }, function (error) {
                    console.log(error);
                }
            );

        }

        init();
        vm.addField = addField;
        vm.removeField = removeField;
        vm.cloneField = cloneField;
        vm.editField = editField;
        vm.updateField = updateField;
        vm.refreshField = refreshField;

        function refreshField() {
            FieldService.findAllFieldsForForm(vm.form._id).then(
                function(response){
                    if(response) {
                        console.log(response.data);
                        vm.fields = response.data.fields;
                    }
                }, function (error) {
                    console.log(error);
                }
            );
        }

        function addField(fieldType) {

            FieldService.addField(fieldType, vm.form._id, vm.user._id).then(
                function(response){
                    if(response) {
                        console.log(response);
                        vm.fieldType = -1;
                        refreshField();
                    }
                }, function (error) {
                    console.log(error);
                }
            );


        }

        function removeField(fieldId) {
            FieldService.deleteField(fieldId,vm.form._id).then(
                function(response){
                    console.log(response)
                    if(response) {
                        refreshField();
                    }
                }, function (error) {
                    console.log(error);
                }
            );

        }

        function cloneField(field) {
            if(field) {
                FieldService.cloneField(field,vm.form._id).then(function(response){
                        if(response) {
                            refreshField();
                        }
                    }, function (error) {
                        console.log(error);
                    }
                );
            }
        }


        function editField(field) {
            console.log("In editField");
            console.log(field);
            if(field) {
                vm.modal = field;
                if(field.options){
                    var arrayOptions = convertToArray(field.options);
                    vm.arrayOptions = arrayOptions;
                    vm.rows = arrayOptions.length;
                }
                $("#myModal").modal('show');
            }
        }

        function convertToArray(options) {
            var arrayOptions = [];
            var opt ="";
            for(var u in options) {
                opt = options[u].label+":"+options[u].value;
                arrayOptions.push(opt);
            }
            return arrayOptions;
        }

        function updateField(field,arrayOptions) {
            if(field) {
                if(arrayOptions){
                    var options = convertArraytoJSON(arrayOptions);
                    field.options = options;
                    console.log(field.options);
                    FieldService.updateField(field,vm.form._id).then(function(response){
                        if(response.data) {
                            vm.fields = response.data;
                            refreshField();
                            $("#myModal").modal('hide');
                        }
                    });
                } else {
                    FieldService.updateField(field,vm.form._id).then(function(response){
                        if(response.data) {
                            vm.fields = response.data;
                            $("#myModal").modal('hide');
                        }
                    });
                }
            }



        }

        function convertArraytoJSON(arrayOptions) {
            var options = [];
            for(var u in arrayOptions) {
                var pairs = arrayOptions[u].split(':');
                var opt = {
                    "label" : pairs[0],
                    "value" : pairs[1]
                }
                options.push(opt);
            }
            return options;
        }
    }


})();