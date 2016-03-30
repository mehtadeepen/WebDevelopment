module.exports = function(app, formModel, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/logout", logout);
    app.get("/api/assignment/user/loggedin",loggedin);
    app.get("/api/assignment/user/:id", profile);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function profile(req,res) {
        console.log("In server :: User Service :: profile");
        var id = req.params.id;
        userModel.findUserById(id).then(
            function (user) {
                res.json(user);
            }, function (error) {
                res.status(400).send(error);
            }
        );
        res.json(user);
    }

    function register(req, res) {
        console.log("In server :: User Service :: register");
        var user = req.body;
        userModel.createUser(user).then(
            function (user) {
                console.log(user);
                if(user) {
                    req.session.currentUser = user;
                    res.json(user);
                } else {

                    res.status(400).send("Invalid User");
                }
            }, function (error) {
                res.status(400).send(error);
            }
        );
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
            userModel.findUserByCredentials(credentials).then(
                function (user) {
                    req.session.currentUser = user;
                    res.json(user);
                }, function (error) {
                    res.status(400).send(error);
                }
            );

        } else if (username != undefined && password == undefined) {
            console.log("In findUserByUsername");
            userModel.findUserByUsername(username).then(
                function (user) {
                    res.json(user);
                }, function (error) {
                    res.status(400).send(error);
                }
            );
        } else {
            console.log("In findAllUsers");
            userModel.findAllUsers().then(
                function (users) {
                    res.json(users);
                }, function (error) {
                    res.status(400).send(error);
                }
            );
        }
    }

    function updateUser(req, res) {
        console.log("In server :: User Service :: updateUser");
        var user = req.body;
        var id = req.params.id;
        console.log(user);
        userModel.updateUserById(id,user).then(
            function (success) {
                console.log(success);
                if(success.n == 1) {
                    res.json(user);
                } else res.status(400).send("There was a problem with update");
            },
            function (error) {
                res.status(400).send(error);
            }
        );
    }

    function deleteUser(req, res) {
        console.log("In server :: User Service :: deleteUser");
        var id = req.params.id;
        userModel.deleteUserById(id).then(
            function (success) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            }
        );
    }

    function logout(req, res) {
        console.log("In server :: User Service :: logout");
        req.session.destroy();
        res.send(200);

    }

    function loggedin(req, res) {
        console.log("In server :: User Service :: loggedin");
        res.json(req.session.currentUser);
    }
}