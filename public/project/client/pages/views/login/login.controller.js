(function(){
    angular
        .module("SpiderMongo")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, sweet) {

        console.log("In Login Controller");
        var vm = this;

        vm.login = login;
        vm.renderSiderbar = renderSiderbar;

        function init() {

            vm.$location = $location;

        }

        init();

        function login(username, password) {
            console.log("login... " + username);
            if(username && password) {
                UserService.findUserByCredentials(username, password).then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/dashboard/true");
                    } else {
                        sweet.show('Oops...', 'Username or Password is incorrect', 'error');
                    }
                },function(error){
                    console.log(error);
                });
            } else {
                sweet.show('Please enter Username or Password');
            }

        }

        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }

    }
})();