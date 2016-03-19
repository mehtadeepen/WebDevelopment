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

            //$("#sortable" ).sortable({
            //    placeholder: "ui-sortable-placeholder",
            //    update: function( event, ui ) {
            //        console.log(vm.fields);
            //        var start = ui.item.data('start'),
            //            end = ui.item.index();
            //        vm.fields.splice(end, 0,
            //            vm.fields.splice(start, 1)[0]);
            //        FieldService.reorderFields(vm.fields,vm.form._id).then(function(response){
            //            if(response.data) {
            //                vm.fields = response.data;
            //            }
            //        });
            //    }
            //});


        }

        init();
        vm.addField = addField;
        vm.removeField = removeField;
        vm.cloneField = cloneField;
        vm.editField = editField;
        vm.updateField = updateField;
        vm.refreshField = refreshField;

        function refreshField() {
            FieldService.findAllFieldsForForm(vm.form._id).then(function(response){
                if(response.data) {
                    vm.fields = response.data;
                }
            });
        }

        function addField(fieldType) {
            if(fieldType > 5 || fieldType < 0) {
                return;
            } else {
                FieldService.addField(fieldType, vm.form._id, vm.user._id).then(function(response){
                    if(response.data) {
                        vm.fields = response.data;
                        vm.fieldType = -1;
                    }
                });
            }

        }

        function removeField(fieldId) {
            FieldService.deleteField(fieldId,vm.form._id).then(function(response){
                if(response.data) {
                    vm.fields = response.data;
                }
            });

        }

        function cloneField(field) {
            if(field) {
                FieldService.cloneField(field,vm.form._id).then(function(response){
                   if(response.data) {
                       vm.fields = response.data;
                   }
                });
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
                    FieldService.updateField(field,vm.form._id).then(function(response){
                        if(response.data) {
                            vm.fields = response.data;
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