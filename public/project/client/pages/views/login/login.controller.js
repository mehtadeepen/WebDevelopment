(function(){
    angular
        .module("SpiderMongo")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {

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
            UserService.findUserByCredentials(username, password).then(function(response){
                if(response.data) {
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                }
            },function(error){
                console.log(error);
            });
        }

        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }

    }
})();