module.exports = function(app, fieldModel) {
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
        fieldModel.findAllFieldsForForm(formId).then(
           function (fields) {
               res.json(fields);
           }, function (error) {
               res.status(400).send(error);
           }
       );
    }

    function deleteFieldForFormById(req, res) {
        console.log("In server :: Field Service :: deleteFieldForFormById");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldById(fieldId,formId).then(
            function (stats) {
                console.log(stat);
                res.json(200);
            },
            function (error) {
                res.status(400).send(error);
            }
        );
    }

    function reorderFields(req, res) {
        console.log("In server :: Field Service :: reorderFields");
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel.reorderFieldsForForm(formId,fields).then(
            function (form) {
                res.json(form);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function createFieldForForm(req, res) {
        console.log("In server :: Field Service :: createFieldForForm");
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createFieldForForm(formId,field).then(
            function (form) {
                res.json(form);
            }, function (error) {
                console.log(error);
                res.status(400).send(error);
            }
        );
    }

    function cloneFieldForForm(req, res) {
        console.log("In server :: Field Service :: cloneFieldForForm");
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.cloneFieldForForm(formId,field).then(
            function (form) {
                res.json(form);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function updateFieldForFormById(req, res) {
        console.log("In server :: Field Service :: updateFieldForFormById");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateFieldForFormById(fieldId,formId,field).then(
            function (form) {
                res.json(form);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function findFieldForForm(req, res) {
        console.log("In server :: Field Service :: findFieldForForm");
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldByIdForForm(fieldId,formId).then(
            function(field) {
                res.json(field);
            }, function (error) {
                res.status(400).send(error);
            }
        );

    }
}