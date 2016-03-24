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
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/database", {
                templateUrl: "views/database/database.view.html",
                controller: "DatabaseController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
                
            })
            .when("/connections", {
                templateUrl: "views/connection/connections.view.html",
                controller: "ConnectionController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
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
                    checkLoggedIn: checkLoggedIn
                }
                
            })
            .when("/collection/:name", {
                templateUrl: "views/collection/collection.view.html",
                controller: "CollectionViewController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
                
            })
            .when("/addDocument/:collectionName", {
                templateUrl: "views/document/document.add.view.html",
                controller: "DocumentAddController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
                
            })
            .when("/editDocument/:collectionName/document/:id", {
                templateUrl: "views/document/document.edit.view.html",
                controller: "DocumentEditController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
                
            })
            .otherwise({
                redirectTo: "/dashboard"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
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
