"use strict";
(function() {

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var api = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        };

        return api;

        function createFormForUser(userId, form, callback) {
            var id = (new Date).getTime();

            var newForm = {
                "_id" : id,
                "title" : form.title,
                "userId" : userId
            };

            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            console.log(userId);
            var formsById = forms.filter(function(form, index, arr){
                return (form.userId === userId);
            });
            console.log(formsById);
            callback(formsById);
        }

        function deleteFormById(formId, callback) {
            var index = getFormIndexById (formId);
            forms.splice(index, 1);
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var index = getFormIndexById (formId);
            forms[index] = {
                "_id" : newForm._id,
                "title" : newForm.title,
                "userId" : newForm.userId
            }
            callback(forms[index]);
        }

        function getFormIndexById (formId) {
            var index = 0;
            for (var i = 0; i < forms.length; i++) {
                if(forms[i]._id === formId){
                    return index;
                }
                index++;
            }
        }
    }


})();