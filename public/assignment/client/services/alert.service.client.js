"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .factory("AlertService", AlertService);

    function AlertService (sweet) {

        var api = {
            displayUserFormError: displayUserFormError,
            alertError: alertError,
            alertSuccess: alertSuccess
        };

        return api;


        function displayUserFormError(error) {
            console.log(error);
            if (error.username) alertError("Username", error.username.message);
            else if (error.password) alertError("Password", error.password.message);
            else if (error.email) alertError("Email", error.email.message);
            else if (error.firstName) alertError("FirstName", error.firstName.message);
            else if (error.lastName) alertError("LastName", error.lastName.message);
            else if (error.phone) alertError("Phone Number", error.phone.message);
            else alertError("Oops", "Something went wrong");
        }

        function alertError(header, message) {
            sweet.show(header, message, 'error');
        }

        function alertSuccess(header, message) {
            sweet.show(header, message, 'success');
        }
    }
})();