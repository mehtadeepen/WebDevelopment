"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService){

        var loggedInUser = $rootScope.user;
        var userId = -1;

        if(loggedInUser != undefined) {
            userId = loggedInUser._id;
            updateFormsForCurrentUser();
        }

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.selected = -1;


        function addForm(form) {
            if(form == undefined || !form.hasOwnProperty("title") || form.title.trim() === "") {
                return;
            }
            FormService.createFormForUser(userId, form, function(newForm) {
                console.log("Form added:");
                console.log(form);
                $scope.selected = -1;
                $scope.form = {};
                updateFormsForCurrentUser()
            });
        }

        function updateForm(form) {
            FormService.updateFormById(form._id, form, function(newForm) {
                console.log("Form Updated:");
                console.log(form);
                $scope.forms[$scope.selected] = newForm;
                $scope.selected = -1;
                $scope.form = {};
            });
        }

        function deleteForm(formId) {
            FormService.deleteFormById(formId, function(udpatedForms) {
                console.log("Form Deleted:");
                console.log(formId);
                updateFormsForCurrentUser();
            });
        }

        function selectForm(index) {
            var editForm = {
                "_id" : $scope.forms[index]["_id"],
                "userId" : $scope.forms[index]["userId"],
                "title" : $scope.forms[index]["title"]
            };
            $scope.form = editForm;
            $scope.selected = index;
        }

        function updateFormsForCurrentUser() {
            FormService.findAllFormsForUser(userId, function (formsByUserId) {
                $scope.forms = formsByUserId;
            });
        }

    }

})();