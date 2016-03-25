(function(){
    angular
        .module("SpiderMongo")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.html",
                controller: "DashBoardController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkConnected: checkConnected
                }
            })
            .when("/dashboard/:refreshPlease", {
                templateUrl: "views/dashboard/dashboard.view.html",
                controller: "DashBoardController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkConnected: checkConnected
                }
            })
            .when("/connections", {
                templateUrl: "views/connection/connections.view.html",
                controller: "ConnectionController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkConnected: checkConnected
                }
                
            })
            .when("/addConnection", {
                templateUrl: "views/connection/connection.add.view.html",
                controller: "ConnectionAddController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn

                }
                
            })
            .when("/editConnection/:ID", {
                templateUrl: "views/connection/connection.edit.view.html",
                controller: "ConnectionEditController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
                
            })
            .when("/user/:userId/database/:databaseName", {
                templateUrl: "views/collection/collections.view.html",
                controller: "CollectionController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkConnectionExist: checkConnectionExist
                }
                
            })
            .when("/collection/:name/database/:databaseName", {
                templateUrl: "views/collection/collection.view.html",
                controller: "CollectionViewController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkConnectionExist: checkConnectionExist
                }
                
            })
            .when("/addDocument/:collectionName/database/:databaseName", {
                templateUrl: "views/document/document.add.view.html",
                controller: "DocumentAddController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkConnectionExist: checkConnectionExist
                }
                
            })
            .when("/editDocument/:collectionName/document/:id/database/:databaseName", {
                templateUrl: "views/document/document.edit.view.html",
                controller: "DocumentEditController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkConnectionExist: checkConnectionExist
                }
                
            })
            .otherwise({
                redirectTo: "/dashboard"
            });
    }

    function checkConnected(UserService, $q, ConnectionService, $location) {
        var deferred = $q.defer();

        UserService.getCurrentUser().then(
            function(response) {
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                ConnectionService.checkConnected(currentUser.username).then(
                    function (response) {
                        if(response.data) {
                            console.log("Connection Found Setting isConnected to true");
                            ConnectionService.setConnected(true);
                            console.log(response.data);
                            ConnectionService.setConnectedTo(response.data);
                            deferred.resolve();
                        } else {
                            console.log("Connection Not Found Setting isConnected to false");
                            ConnectionService.setConnected(false);
                            deferred.resolve();
                        }
                    }, function(error) {
                        console.log(error);
                    }
                );

            }, function (error){
                deferred.reject();
                $location.url("/login");
            });

        return deferred.promise;
    }

    function checkConnectionExist (UserService, $q, ConnectionService, $location) {
        var deferred = $q.defer();

        UserService.getCurrentUser().then(
            function(response) {
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                ConnectionService.checkConnected(currentUser.username).then(
                    function (response) {
                        if(response.data) {
                            console.log("Connection Found Setting isConnected to true");
                            ConnectionService.setConnected(true);
                            console.log(response.data);
                            ConnectionService.setConnectedTo(response.data);
                            deferred.resolve();
                        } else {
                            console.log("Connection Not Found Setting isConnected to false");
                            ConnectionService.setConnected(false);
                            deferred.resolve();
                            $location.url("/connections");
                        }
                    }, function(error) {
                        console.log(error);
                    }
                );

            }, function (error){
                deferred.reject();
                $location.url("/login");
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/login");
                }
            });

        return deferred.promise;
    }
})();
