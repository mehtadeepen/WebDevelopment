/**
 * Created by dmehta on 3/13/16.
 */
"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);


        function FieldService($http) {
        var api = {
            findAllFieldsForForm: findAllFieldsForForm
        }

        return api;

    function findAllFieldsForForm(formId) {
        console.log("In client :: FieldService :: findAllFieldsForForm :: "+formId);
        return $http.get("/api/assignment/form/"+formId+"/field");
    }

        }
})();