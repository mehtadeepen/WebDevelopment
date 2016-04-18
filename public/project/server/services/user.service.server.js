
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel, securityService) {
    //security
    //var securityService = require("../../../security/security.js")(userModel);

    var auth = authorized;
    var passport = securityService.getPassport();
    app.post("/api/project/user", register);
    app.post("/api/project/user/login",passport.authenticate('project'), logon);
    app.post("/api/project/user/logout",logout);
    app.get("/api/project/user/loggedin",loggedin);
    app.get("/api/project/user/check/:username", checkUserName);
    app.get("/api/project/user/:username", auth,profile);
    app.put("/api/project/user/:username",auth, updateUser);


    function logon(req, res){
        console.log("In server :: User Service :: logon");
        var user = req.user;
        res.json(user);
    }

    function authorized (req, res, next) {
        console.log("In server :: User Service :: authorized");
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function checkUserName(req,res) {
        console.log("In project :: User Service :: checkUserName");
        var username = req.params.username;
        userModel.findUserByUsername(username).then(
            function(user){
                req.session.currentUser = user;
                res.json(user);
            },function(error){
                res.status(400).send(error);
            }
        );
    }
    function profile(req,res) {
        console.log("In project :: User Service :: profile");
        var username = req.params.username;
        userModel.findUserByUsername(username).then(
            function(user){
                req.session.currentUser = user;
                res.json(user);
            },function(error){
                res.status(400).send(error);
            }
        );
    }

    function register(req, res) {
        console.log("In project :: User Service :: register");
        var user = req.body;
        userModel.createUser(user).then(
            function(user){
                req.login(user,function (error) {
                    if(error) {
                        res.status(400).send(error);
                    } else {
                        res.json(user);
                    }
                });
            },function(error){
                res.status(400).send(error);
            });
    }

    function updateUser(req, res) {
        console.log("In project :: User Service :: updateUser");
        var user = req.body;
        var username = req.params.username;
        userModel.updateUserByUsername(username,user).then(
            function(user){
                res.json(user);
            },function(error){
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
}