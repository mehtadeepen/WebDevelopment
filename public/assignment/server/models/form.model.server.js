

module.exports = function(db,mongoose) {

    var FormSchema = require("./form.schema.server.js")();
    var FormModel = mongoose.model("FormModel", FormSchema);

    var api = {
        getModel: getModel,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        createFormForUser: createFormForUser,
        findAllFormsForUserByName: findAllFormsForUserByName
    };
    return api;


    function getModel() {
        return FormModel;
    }

    function findAllFormsForUser(userId) {
        console.log("In server :: Form Model ::  findAllFormsForUser "+userId);
        return FormModel.find({userId : userId});
    }

    function findFormById(formId) {
        console.log("In server :: Form Model ::  findFormById "+formId);
        return FormModel.findById(formId);
    }

    function deleteFormById(id) {
        console.log("In server :: Form Model ::  deleteFormById "+id);
        return FormModel.remove({_id: id});
    }

    function createFormForUser(userId, form) {
        console.log("In server :: Form Model ::  createFormForUser "+userId);
        form.fields = [];
        form.userId = userId;
        return FormModel.create(form);
    }

    function updateFormById(id,newForm) {
        console.log("In server :: Form Model ::  updateFormById "+id);
        delete newForm._id;
        return FormModel.update({_id: id}, {$set: newForm},{runValidators: true});
    }

    function findAllFormsForUserByName(title,userId){
        console.log("In server :: Form Model ::  findAllFormsForUserByName "+userId);
        return FormModel.findOne({userId: userId, title : title});
    }

}