module.exports = function(app, formModel, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", profile);
    app.get("/api/assignment/user?", login);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function profile(req,res) {
        console.log("In profile");
        var id = req.params.id;
        var user = userModel.findUserById(id);
        res.json(user);
    }

    function register(req, res) {
        console.log("In register");
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function findAllUsers(req, res) {
        console.log("In findAllUsers and findUserByCredentials and findUserByUsername");
        var username = req.query.username;
        var password = req.query.password;
        console.log("username: "+username);
        console.log("password: "+password);
        if(username != undefined && password != undefined) {
            console.log("In findUserByCredentials");
            var credentials = {
                "username": username,
                "password": password
            };
            var user = userModel.findUserByCredentials(credentials);
            console.log(user);
            req.session.currentUser = user;
            res.json(user);
        } else if (username != undefined && password == undefined) {
            console.log("In findUserByUsername");
            var user = userModel.findUserByUsername(username);
            res.json(user);
        } else {
            console.log("In findAllUsers");
            var users = userModel.findAllUsers();
            res.json(users);
        }

    }

    function updateUser(req, res) {
        console.log("In updateUser");
        var user = req.body;
        var id = req.params.id;
        console.log(user);
        console.log(id);
        var users = userModel.updateUserById(id,user);
        res.json(users);
    }

    function deleteUser(req, res) {
        console.log("In deleteUser");
        var id = req.params.id;
        var users = userModel.deleteUserById(id);
        res.json(users);
    }

    function login(req, res) {
        console.log("In login");

        var username = req.query.username;
        var password = req.query.password;

        if(username != undefined && password != undefined) {

            var credentials = {
                "username": username,
                "password": password
            };
            var user = userModel.findUserByCredentials(credentials);
            req.session.currentUser = user;
            res.json(user);
        } else if (username != undefined && password == undefined) {
            var user = userModel.findUserByUsername(username);
            res.json(user);
        }

    }
}