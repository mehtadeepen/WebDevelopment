"use strict";
(function() {
    angular
        .module("SpiderMongo")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, sweet) {

        var vm = this;

        function init() {
            vm.$location = $location;
            vm.vpassword = "";
        }

        init();

        vm.register = register;


        function register(user) {
           if(user.username && user.password && vm.vpassword) {
               if(user.password !== vm.vpassword) {
                   sweet.show('Oops...', "Password don't match", 'error');
                   return;
               }
               UserService.findUserByUsername(user.username).then(
                   function (response){
                       if (response.data) {
                           console.log("User Already Exists");
                           sweet.show("User Already Exists !!");
                           return;
                       } else {
                           UserService.createUser(user).then(
                               function(response){
                                   if (response.data) {
                                       UserService.setCurrentUser(response.data);
                                       $location.url("/profile");
                                   }
                               },function(error){
                                   console.log(error);
                                   sweet.show('Oops...', error.data.message, 'error');
                               });
                       }
                   },function(error){
                       console.log(error);
                       sweet.show('Oops...', error.data.message, 'error');
                   });
           } else {
               sweet.show('Oops...', 'Please complete details', 'error');
           }

        }
    }
})();