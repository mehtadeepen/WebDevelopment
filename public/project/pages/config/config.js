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
            .when("/collections", {
                templateUrl: "views/collection/collections.view.html",
                controller: "CollectionController"
                
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
                
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html"
                
            })
            .otherwise({
                redirectTo: "/dashboard"
            });
    }
})();
