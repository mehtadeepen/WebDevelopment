(function(){
    angular
        .module("SpiderMongo")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootScope) {

        console.log("In Login Controller");
        var vm = this;

        vm.login = login;
        vm.renderSiderbar = renderSiderbar;

        function init() {

            vm.$location = $location;

        }

        init();

        function login(username, password) {
            console.log("login... " + username)
            UserService.findUserByCredentials(username, password, goToProfile);
        }

        function goToProfile(user) {
            console.log(user);
            if (user != null) {
                $rootScope.user = user;
                $location.url("/dashboard")
            }

        }

        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }

    }
})();