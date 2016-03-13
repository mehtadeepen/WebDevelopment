"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, $rootScope, FormService){

        var vm = this;

        function init() {

            vm.hideplus = false;
            vm.selected = -1;

        }
        init();

        var userId = -1;
        var loggedInUser = $rootScope.user;

        if($rootScope.user === undefined) {
            $location.url("/")
        }

        if(loggedInUser != undefined) {
            console.log()
            userId = loggedInUser._id;
            console.log(userId);
            updateFormsForCurrentUser();
        }

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.goToForm = goToForm;




        function addForm(form) {
            if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                console.log("In bug");
                return;
            }

            FormService.findAllFormsForUserByName(userId, form).then(function(response){
                if(response.data) {
                    alert("Form already exits");
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

            if(form.title === "" || form.title == null || form.title === undefined) {

                console.log("Do Nothing");
                vm.selected = -1;
                vm.form = {};
                vm.hideplus = false;

            }
            else {
                FormService.updateFormById(form._id, form).then(function(response){
                    if(response.data) {
                        console.log("Form Updated:");
                        FormService.findAllFormsForUser(userId).then(function(res) {
                            if(res.data) {
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

        function updateFormsForCurrentUser() {
            FormService.findAllFormsForUser(userId).then(function(response) {
                if(response.data) {
                    vm.forms = response.data;

                }
            });

        }

        function goToForm(form)  {
            if(form) {
                $location
            }
        }

    }

})();