module.exports = function(app, formModel, userModel, uuid) {

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/user/:userId/form/title/:title",findAllFormsForUserByName);



    function findAllFormsForUser(req, res) {
        console.log("In server :: Form Service :: findAllFormsForUser");
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId).then(
            function (forms) {
                res.json(forms);
            }, function (error) {
                res.status(400).send(error);
            }
        );

    }

    function findFormById(req, res) {
        console.log("In server :: Form Service :: findFormById");
        var formId = req.params.formId;
        formModel.findFormById(formId).then(
            function (form) {
                res.json(form);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function deleteFormById(req, res) {
        console.log("In server :: Form Service :: deleteFormById");
        var formId = req.params.formId;
        formModel.deleteFormById(formId).then(
            function (stats) {
                res.json(stats);
            },  function (error) {
                res.status(400).send(error);
            }
        );
    }

    function createFormForUser(req, res) {
        console.log("In server :: Form Service :: createFormForUser");
        var userId = req.params.userId;
        var form = req.body;
        formModel.createFormForUser(userId,form).then(
            function (form) {
                res.json(form);
            },  function (error) {
                res.status(400).send(error);
            }
        );
    }

    function updateFormById(req, res) {
        console.log("In server :: Form Service :: updateFormById");
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateFormById(formId,form).then(
            function (stats) {
                res.json(stats);
            },  function (error) {
                res.status(400).send(error);
            }
        );
    }

    function findAllFormsForUserByName(req, res) {
        console.log("In server :: Form Service :: findAllFormsForUserByName");
        var title = req.params.title;
        var userId = req.params.userId;
        formModel.findAllFormsForUserByName(title,userId).then(
            function(form) {
                res.json(form);
            }
        ,  function (error) {
            res.status(400).send(error);
        });
    }


}