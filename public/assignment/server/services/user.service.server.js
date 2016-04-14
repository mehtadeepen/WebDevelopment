var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, formModel, userModel) {
    var auth = authorized;
    app.post("/api/assignment/admin/user", auth, createUser);
    app.get("/api/assignment/admin/user",findAllUsersForAdmin);
    app.get("/api/assignment/admin/user/:id",findUserForAdmin);
    app.delete("/api/assignment/admin/user/:id",auth,deleteUserByAdmin);
    app.put("/api/assignment/admin/user/:id",auth,updateUserByAdmin);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/logout", logout);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.get("/api/assignment/user/:id", profile);
    app.put("/api/assignment/user/:id", auth,updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);
    app.post('/api/assignment/login', passport.authenticate('local'), logon);
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function updateUserByAdmin(req,res) {
        var newUser = req.body;
        if(isAdmin(req.user)) {
            console.log("In server :: User Service :: updateUserByAdmin",user);
            if(typeof newUser.roles == "string") {
                newUser.roles = newUser.roles.split(",");
            }
            userModel.updateUserById(req.params.id,newUser)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else res.status(403);
    }

    function deleteUserByAdmin(req, res) {
        if(isAdmin(req.user)) {
            console.log("In server :: User Service :: deleteUserByAdmin",user);
            userModel.deleteUserById(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else res.status(403);
    }

    function createUser(req, res) {
        var user = req.body;
        if(!isAdmin(req.user))
            res.send(401);
        console.log("In server :: User Service :: create User",user);
        user.password = bcrypt.hashSync(user.password);
        userModel.createUserForAdmin(user).then(
            function (user) {
                console.log(user);
                res.send(user);
            }, function (error) {
                res.status(400).send(error);
            }
        );

    }

    function findAllUsersForAdmin(req, res) {
        console.log("In server :: User Service :: findAllUsersForAdmin");
        if(isAdmin(req.user)) {
            console.log("In findAllUsers");
            userModel.findAllUsers().then(
                function (users) {
                    res.json(users);
                }, function (error) {
                    res.status(400).send(error);
                }
            );
        } else res.status(403);
    }

    function findUserForAdmin(req, res) {
        console.log("In server :: User Service :: findUserForAdmin");
        if(isAdmin(req.user)) {
            var id = req.params.id;
            userModel.findUserById(id).then(
                function (user) {
                    res.json(user);
                }, function (error) {
                    res.status(400).send(error);
                }
            );
        } else res.status(403);
    }

    function localStrategy(username, password, done) {
        console.log("In server :: User Service :: localStrategy");
        // lookup developer by username only. cant compare password since it's encrypted
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    console.log("User Found ....",user);
                    console.log(user.password);
                    console.log(password);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("User Authenticated ....")
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function authorized (req, res, next) {
        console.log("In server :: User Service :: authorized");
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


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
    }

    function register(req, res) {
        console.log("In server :: User Service :: register");
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.createUser(user).then(
            function (user) {
                console.log(user);
                if(user) {
                    req.login(user,function (error) {
                        if(err) {
                            res.status(400).send(error);
                        } else {
                            res.json(user);
                        }
                    })
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
        req.logOut();
        res.send(200);

    }

    function loggedin(req, res) {
        console.log("In server :: User Service :: loggedin");
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logon(req, res){
        console.log("In server :: User Service :: logon");
        var user = req.user;
        res.json(user);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }
}