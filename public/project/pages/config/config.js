(function(){
    angular
        .module("SpiderMongo")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.html",
                controller: "DashBoardController",
                controllerAs: "model"
            })
            .when("/database", {
                templateUrl: "views/database/database.view.html",
                controller: "DatabaseController",
                controllerAs: "model"
                
            })
            .when("/connections", {
                templateUrl: "views/connection/connections.view.html",
                controller: "ConnectionController",
                controllerAs: "model"
                
            })
            .when("/addConnection", {
                templateUrl: "views/connection/connection.add.view.html",
                controller: "ConnectionController",
                controllerAs: "model"
                
            })
            .when("/editConnection/:ID", {
                templateUrl: "views/connection/connection.edit.view.html",
                controller: "ConnectionController",
                controllerAs: "model"
                
            })
            .when("/collections", {
                templateUrl: "views/collection/collections.view.html",
                controller: "CollectionController"
                
            })
            .when("/collection", {
                templateUrl: "views/collection/collection.view.html",
                controller: "CollectionController"
                
            })
            .when("/addDocument", {
                templateUrl: "views/document/document.add.view.html"
                
            })
            .when("/editDocument", {
                templateUrl: "views/document/document.edit.view.html"
                
            })
            .otherwise({
                redirectTo: "/dashboard"
            });
    }
})();
