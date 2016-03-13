module.exports = function(app, formModel, userModel, uuid) {

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/user/:userId/form/title/:title",findAllFormsForUserByName);



    function findAllFormsForUser(req, res) {
        console.log("In findAllFormsForUser");
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        console.log(forms);
        res.json(forms);
    }

    function findFormById(req, res) {
        console.log("In findFormById");
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        console.log("In deleteFormById");
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        console.log("In createFormForUser");
        var userId = req.params.userId;
        var newFormId = uuid.v4();
        var form = req.body;
        var forms = formModel.createFormForUser(userId,newFormId,form);
        res.json(forms);


    }

    function updateFormById(req, res) {
        console.log("In updateFormById");
        var formId = req.params.formId;
        var form = req.body;
        var forms = formModel.updateFormById(formId,form);
        res.json(forms);
    }

    function findAllFormsForUserByName(req, res) {
        console.log("In findAllFormsForUserByName");
        var title = req.params.title;
        var userId = req.params.userId;
        var form = formModel.findAllFormsForUserByName(title,userId);
        res.json(form);

    }


}