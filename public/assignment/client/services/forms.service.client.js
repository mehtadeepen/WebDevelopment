"use strict";
(function() {

    angular
    .module("FormBuilderApp")
    .factory("FormService", FormService);

    function FormService($http) {

        var api = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            findAllFormsForUserByName : findAllFormsForUserByName,
            findFormById: findFormById
        };

        return api;

        function createFormForUser(userId, form) {
            console.log("In createFormForUser");
            return $http.post("/api/assignment/user/"+userId+"/form",form);
        }

        function findAllFormsForUser(userId) {
            console.log("In findAllFormsForUser");
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function findAllFormsForUserByName(userId, form1) {
          console.log("In findAllFormsForUserByName");
            return $http.get("/api/assignment/user/"+userId+"/form/title/"+form1.title);
        }

        function deleteFormById(formId) {
            console.log("In deleteFormById");
            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId, form) {
            console.log("In updateFormById");
            return $http.put("/api/assignment/form/"+formId,form);
        }

        function findFormById(formId) {
            console.log("In findFormById");
            return $http.get("/api/assignment/form/"+formId);
        }
    }


})();