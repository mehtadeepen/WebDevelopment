module.exports = function(app, userModel, liveConnection,collectionsMap ) {
    app.post("/api/project/user", register);
    app.post("/api/project/user/login", login);
    app.post("/api/project/user/logout",logout);
    app.get("/api/project/user/loggedin",loggedin);
    app.get("/api/project/user/check/:username", checkUserName);
    app.get("/api/project/user/:username", profile);
    app.put("/api/project/user/:username", updateUser);


    function checkUserName(req,res) {
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
                req.session.currentUser = user;
                res.json(user);
            },function(error){
                res.status(400).send(error);
            });
    }

    function login(req, res) {
        console.log("In project :: User Service :: login");
        var credentials = req.body;
        console.log(credentials);
        userModel.findUserByCredentials(credentials)
            .then(
                function (user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                // send error if promise rejected
                function ( error ) {
                    res.status(400).send(error);
                }
            )
    }

    function updateUser(req, res) {
        console.log("In project :: User Service :: updateUser");
        var user = req.body;
        var username = req.params.username;
        userModel.updateUserByUsername(username,user).then(
            function(user){
                req.session.currentUser = user;
                res.json(user);
            },function(error){
                res.status(400).send(error);
            }
        );
    }

    function logout(req, res) {
        console.log("In project :: User Service :: logout");
        req.session.destroy();
        res.send(200);

    }

    function loggedin(req, res) {
        console.log("In project :: User Service :: loggedin");
        res.json(req.session.currentUser);
    }
}