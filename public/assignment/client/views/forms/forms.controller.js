"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, $rootScope, FormService, UserService, AlertService){

        var vm = this;
        var userId = -1;
        function init() {

            vm.hideplus = false;
            vm.selected = -1;
            UserService.getCurrentUser().then(function(response){
                if(response.data){

                    var loggedInUser = response.data;
                    if(loggedInUser != undefined) {
                        console.log(loggedInUser);
                        userId = loggedInUser._id;
                        console.log(userId);
                        updateFormsForCurrentUser(userId);
                    }
                }
            });

        }
        init();



        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;





        function addForm(form) {
            if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                console.log("In bug");
                return;
            }

            FormService.findAllFormsForUserByName(userId, form).then(function(response){
                if(response.data) {
                    AlertService.alertError('Error',"Form already exits");
                } else {
                    FormService.createFormForUser(userId,form).then(function(response){
                        if(response.data) {
                            vm.selected = -1;
                            vm.form = {};
                            FormService.findAllFormsForUser(userId).then(function(res){
                                if(res.data) {
                                    vm.forms = res.data;
                                }
                            });
                        }
                    });
                }
            });
        }

        function updateForm(form) {

            if (form.title === "" || form.title == null || form.title === undefined) {

                console.log("Do Nothing");
                vm.selected = -1;
                vm.form = {};
                vm.hideplus = false;

            }
            else {
                FormService.findAllFormsForUserByName(userId, form).then(function (response) {
                    if (response.data) {
                        alert("Form already exits");
                        console.log("Do Nothing");
                        vm.selected = -1;
                        vm.form = {};
                        vm.hideplus = false;
                    } else {
                        FormService.updateFormById(form._id, form).then(function (response) {
                            if (response.data) {
                                console.log("Form Updated:");
                                FormService.findAllFormsForUser(userId).then(function (res) {
                                    if (res.data) {
                                        vm.forms = res.data;

                                    }
                                });
                                vm.forms = response.data;
                                vm.selected = -1;
                                vm.form = {};
                                vm.hideplus = false;
                            }
                        });
                    }
                });
            }
        }

            function deleteForm(formId) {
                FormService.deleteFormById(formId).then(function(response){
                    if(response.data) {
                        FormService.findAllFormsForUser(userId).then(function(response) {
                            if(response.data) {
                                vm.forms = response.data;

                            }
                        });
                        vm.hideplus = false;
                    }
                });
            }

            function selectForm(index) {
                var editForm = {
                    "_id" : vm.forms[index]["_id"],
                    "userId" : vm.forms[index]["userId"],
                    "title" : vm.forms[index]["title"]
                };
                vm.form = editForm;
                vm.selected = index;
                vm.hideplus = true;
            }

            function updateFormsForCurrentUser(userId) {
                FormService.findAllFormsForUser(userId).then(function(response) {
                    if(response.data) {
                        vm.forms = response.data;

                    }
                });

            }



        }

    })();