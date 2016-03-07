(function(){
    angular
        .module("SpiderMongo")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.html",
                controller: "DashBoardController"
            })
            .when("/database", {
                templateUrl: "views/database/database.view.html",
                controller: "DatabaseViewController"
                
            })
            .when("/connections", {
                templateUrl: "views/connection/connections.view.html",
                controller: "CollectionController"
                
            })
            .when("/addConnection", {
                templateUrl: "views/connection/connection.add.view.html",
                controller: "CollectionController"
                
            })
            .when("/editConnection", {
                templateUrl: "views/connection/connection.edit.view.html",
                controller: "CollectionController"
                
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
