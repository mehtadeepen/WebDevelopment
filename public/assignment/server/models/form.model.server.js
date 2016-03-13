var mock = require("./form.mock.json");
module.exports = function() {

    var api = {
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        createFormForUser: createFormForUser,
        findFormByTitle: findFormByTitle,
        findAllFormsForUserByName: findAllFormsForUserByName,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createFieldForForm: createFieldForForm,
        updateFieldForFormById: updateFieldForFormById
    };
    return api;



    function findAllFormsForUser(userId) {
        console.log("In model findAllFormsForUser "+userId);
        console.log(mock);
        var formsById = mock.filter(function(form, index, arr){
            return (form.userId == userId);
        });
        return formsById;
    }

    function findFormById(formId) {

        for(u in mock) {
            if(mock[u]._id == formId) {
                return mock[u];
            }
        }

        return null;
    }


    function deleteFormById(id) {
        var index = -1;
        for(var u in mock) {
            if( mock[u]._id === id ) {
                index = u;
                break;
            }
        }

        if(index != -1) {
            mock.splice(index,1);
        }

        return mock;
    }

    function createFormForUser(userId, formId, form) {
        var id = formId;

        var newForm = {
            "_id" : id,
            "title" : form.title,
            "userId" : userId,
            "fields": []
        };

        mock.push(newForm);
        return mock;

    }

    function updateFormById(id,newForm) {
        console.log("In updateFormById");
        console.log(newForm);
        console.log(id);

        var index = 0;
        var formIndex = -1;
        for (var i = 0; i < mock.length; i++) {
            if(mock[i]._id === id){
                formIndex = index;

            }
            index++;
        }

        if(formIndex != -1) {

            console.log("Index Number : "+formIndex);
            mock[formIndex] = {
                "_id" : newForm._id,
                "title" : newForm.title,
                "userId" : newForm.userId
            }
            console.log(mock);
        }

        return mock;
    }

    function findFormByTitle(title){

        for(u in mock) {
            if(mock[u].title === title) {
                return mock[u];
            }
        }

        return null;

    }

    function findAllFormsForUserByName(title,userId){

        for(u in mock) {
            if(mock[u].title === title && mock[u].userId === userId) {
                return mock[u];
            }
        }

        return null;
    }

    function findAllFieldsForForm(formId){
        console.log("In server :: Form Model :: findAllFieldsForForm");
        for(u in mock) {
            if(mock[u]._id == formId) {
                return mock[u].fields;
            }
        }
        return null;

    }

    function findFieldById(fieldId,fields) {
        console.log("In server :: Form Model :: findFieldById");
        for(u in fields) {
            if(fields[u]._id == fieldId) {
                return fields[u];
            }
        }
        return null;
    }

    function deleteFieldById(fieldId,fields,formId) {
        console.log("In server :: Form Model :: deleteFieldById");
        var index = -1;
        for(var u in fields) {
            if( fields[u]._id === fieldId ) {
                index = u;
                break;
            }
        }


        if(index != -1) {
            fields.splice(index,1);

            for(m in mock) {
                if(mock[m]._id == formId) {
                    mock[m].fields = fields;
                }
            }
        }
        return fields;
    }

    function updateFieldForFormById(fieldId,fields,formId, field) {
        console.log("In server :: Form Model :: updateFieldForFormById");
        var index = -1;
        for(var u in fields) {
            if( fields[u]._id === fieldId ) {
                index = u;
                break;
            }
        }


        if(index != -1) {
            console.log("Index Number : "+index);
            if(field.hasOwnProperty("options") || field.type === "OPTIONS") {
                fields[index] = {
                    "_id" : field._id,
                    "lable" : field.lable,
                    "type" : field.type,
                    "placeholder": field.placeholder,
                    "options" : field.options
                };
            } else {
                fields[index] = {
                    "_id" : field._id,
                    "lable" : field.lable,
                    "type" : field.type,
                    "placeholder": field.placeholder
                };
            }

            for(m in mock) {
                if(mock[m]._id == formId) {
                    mock[m].fields = fields;
                }
            }
        }
        return fields;
    }

    function createFieldForForm(formId, fieldId, field) {
        var newFieldId = fieldId;
        var fields = findAllFieldsForForm(formId);

        if(field.hasOwnProperty("options") || field.type === "OPTIONS") {
            var newField = {
                "_id" : newFieldId,
                "lable" : field.lable,
                "type" : field.type,
                "placeholder": field.placeholder,
                "options" : field.options
            };
        } else {
            var newField = {
                "_id" : newFieldId,
                "lable" : field.lable,
                "type" : field.type,
                "placeholder": field.placeholder
            };
        }


        fields.push(newField);

        for(m in mock) {
            if(mock[m]._id == formId) {
                mock[m].fields = fields;
            }
        }

        return fields;

    }

}