"use strict";
(function(){

    angular
        .module("SpiderMongo")
        .factory("DashBoardService", DashBoardService);

    function DashBoardService ($http, $rootScope) {

        var api = {
            loadDashboard: loadDashboard
        };

        return api;

        function loadDashboard(userId) {
            console.log("In DashBoardService :: loadDashboard ",userId);
            return $http.get("/api/spidermongo/dashboard/user/"+userId);
        }

    }
})();