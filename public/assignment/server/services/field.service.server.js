module.exports = function(app, formModel, userModel, uuid) {
    app.post("/api/assignment/form/:formId/fields", reorderFields);
    app.post("/api/assignment/form/:formId/clone/field", cloneFieldForForm);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForFormById);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForFormById);
    app.get("/api/assignment/form/:formId/field/:fieldId",findFieldForForm);



    function findAllFieldsForForm(req, res) {
        console.log("In server :: Field Service :: findAllFieldsForForm");
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForForm(formId);
        console.log(fields);
        res.json(fields);
    }

    function deleteFieldForFormById(req, res) {
        console.log("In server :: Field Service :: deleteFieldForFormById");
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForForm(formId);
        var fieldId = req.params.fieldId;
        var newfields = formModel.deleteFieldById(fieldId,fields,formId);
        res.json(newfields);
    }

    function reorderFields(req, res) {
        console.log("In server :: Field Service :: reorderFields");
        var formId = req.params.formId;
        var fields = req.body;
        var newFields = formModel.reorderFieldsForForm(formId,fields);
        res.json(newFields);
    }

    function createFieldForForm(req, res) {
        console.log("In server :: Field Service :: createFieldForForm");
        var formId = req.params.formId;
        var newFieldId = uuid.v4();
        var field = req.body;
        var fields = formModel.createFieldForForm(formId,newFieldId,field);
        res.json(fields);
    }

    function cloneFieldForForm(req, res) {
        console.log("In server :: Field Service :: cloneFieldForForm");
        var formId = req.params.formId;
        var newFieldId = uuid.v4();
        var field = req.body;
        var fields = formModel.cloneFieldForForm(formId,newFieldId,field);
        res.json(fields);
    }

    function updateFieldForFormById(req, res) {
        console.log("In server :: Field Service :: updateFieldForFormById");
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForForm(formId);
        var fieldId = req.params.fieldId;
        var field = req.body;
        var newfields = formModel.updateFieldForFormById(fieldId,fields,formId,field);
        res.json(newfields);
    }

    function findFieldForForm(req, res) {
        console.log("In server :: Field Service :: findFieldForForm");
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForForm(formId);
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldById(fieldId,fields);
        res.json(field);

    }


}