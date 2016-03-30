/**
 * Created by dmehta on 3/29/16.
 */
"use strict";


module.exports = function(formModel,mongoose) {

    var FieldSchema = require("./field.schema.server.js")();
    var FieldModel = mongoose.model("FieldModel", FieldSchema);
    var FormModel = formModel.getModel();


    var api = {
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByIdForForm: findFieldByIdForForm,
        deleteFieldById: deleteFieldById,
        createFieldForForm: createFieldForForm,
        updateFieldForFormById: updateFieldForFormById,
        cloneFieldForForm: cloneFieldForForm,
        reorderFieldsForForm: reorderFieldsForForm
    };
    return api;

    function findAllFieldsForForm(formId){
        console.log("In server :: Form Model :: findAllFieldsForForm");
        return FormModel.findById(formId).select("fields");

    }

    function findFieldByIdForForm(fieldId,formId) {
        console.log("In server :: Form Model :: findFieldByIdForForm");
        return FormModel.findById(formId).then(
                function(form){
                    return form.fields.id(fieldId);
                }
            );
    }

    function deleteFieldById(fieldId,formId) {
        console.log("In server :: Form Model :: deleteFieldById");
        return FormModel.findById(formId).then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function updateFieldForFormById(fieldId,formId, field) {
        console.log("In server :: Form Model :: updateFieldForFormById");

        return FormModel
            .findById(formId)
            .then(
                function(form){
                    var fieldObj  = form.fields.id(fieldId);
                    fieldObj = field;
                    return form.save();
                }
            );
    }

    function createFieldForForm(formId, field) {
        console.log("In server :: Field Model :: createFieldForForm :: "+formId,field);
        var customField = getCustomField(field);
        return FormModel.findById(formId)
            .then(
                function(form) {
                    form.fields.push(customField);
                    return form.save();
                }
            );

    }

    function getCustomField(field) {
        if(field.type === "OPTIONS" || field.type === "CHECKBOXES" || field.type === "RADIOS") {
            field.options = [{ label : "OPTION A", value: "OPTION A"}];
        } else {
            field.placeholder = "Default Placeholder";
        }
        return field;
    }

    function cloneFieldForForm(formId, field) {
        console.log("In server :: FormModel :: cloneFieldForForm :: "+formId);
        return FormModel.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function reorderFieldsForForm(formId,fields) {
        console.log("In server :: FormModel :: reorderFieldsForForm :: "+formId);
        return FormModel.findById(formId)
            .then(
                function(form) {
                    form.fields = fields;
                    form.markModified("fields");
                    return form.save();
                }
            );
    }


}





