"use strict";
(function(){

    angular
        .module("SpiderMongo")
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
            if(error) {
                for (var key in error) {
                    alertError("Invalid Input", error[key].message);
                    break;
                }
            }
        }

        function alertError(header, message) {
            sweet.show(header, message, 'error');
        }

        function alertSuccess(header, message) {
            sweet.show(header, message, 'success');
        }
    }
})();