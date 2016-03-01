"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService){

        var loggedInUser = $rootScope.user;
        var userId = -1;
        $scope.hideplus = false;

         if($rootScope.user === undefined) {
             $location.url("/")
        }

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

            var check = FormService.findAllFormsForUserByName(userId, form);

            
            if (check === -1) {
                alert("Form already exits");
            }  else {
                
                FormService.createFormForUser(userId, form, function(newForm) {
                
                
                $scope.selected = -1;
                $scope.form = {};
                updateFormsForCurrentUser() 
            
            });
            }
            
        }

        function updateForm(form) {
            
            
            if(form.title === "" || form.title == null || form.title === undefined) {
                
                console.log("Do Nothing");
                $scope.selected = -1;
                $scope.form = {};
                $scope.hideplus = false;

            }
            else {
            FormService.updateFormById(form._id, form, function(newForm) {
                console.log("Form Updated:");
                console.log(form);
                $scope.forms[$scope.selected] = newForm;
                $scope.selected = -1;
                $scope.form = {};
                $scope.hideplus = false;
            });

        }
        }

        function deleteForm(formId) {
            FormService.deleteFormById(formId, function(udpatedForms) {
                console.log("Form Deleted:");
                console.log(formId);
                $scope.form.title="";
                $scope.hideplus = false;
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
            $scope.hideplus = true;
        }

        function updateFormsForCurrentUser() {
            FormService.findAllFormsForUser(userId, function (formsByUserId) {
                $scope.forms = formsByUserId;
            });
        }

    }

})();