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
            findAllFieldsForForm: findAllFieldsForForm,
            addField: addField,
            deleteField: deleteField,
            cloneField: cloneField,
            updateField: updateField,
            reorderFields: reorderFields
        }

        return api;

        function findAllFieldsForForm(formId) {
            console.log("In client :: FieldService :: findAllFieldsForForm :: "+formId);
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function addField(fieldType, formId, userId) {
            console.log("In client :: FieldService :: addField :: "+fieldType);
            var field = {
                "fieldType" : fieldType,
                "userId": userId
            }
            console.log(field);
            return $http.post("/api/assignment/form/"+formId+"/field", field);
        }

        function deleteField(fieldId,formId) {
            console.log("In client :: FieldService :: deleteField :: "+fieldId);
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function cloneField(field,formId) {
            console.log("In client :: FieldService :: cloneField :: "+formId);
            return $http.post("/api/assignment/form/"+formId+"/clone/field", field);
        }

        function updateField(field,formId) {
            console.log("In client :: FieldService :: updateField :: "+formId);
            return $http.put("/api/assignment/form/"+formId+"/field/"+field._id, field);
        }

        function reorderFields(fields,formId) {
            console.log("In client :: FieldService :: reorderFields :: "+formId);
            console.log(fields);
            return $http.post("/api/assignment/form/"+formId+"/fields", fields);
        }


    }
})();