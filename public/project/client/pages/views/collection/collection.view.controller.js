(function(){
    angular
        .module("SpiderMongo")
        .controller("CollectionViewController", CollectionViewController);

    function CollectionViewController($scope,CollectionService, $routeParams, $location, UserService) {

        var vm = this;
        vm.filteredDocuments = [];
        vm.itemsPerPage = 2;
        vm.currentPage = 4;


        console.log("In CollectionViewController ");

        function init() {
            vm.$location = $location;
            console.log($routeParams.name);
            getAllDocumentsForDatabase($routeParams.name);

        }
        init();

        function figureOutTodosToDisplay(documents) {
            var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
            var end = begin + vm.itemsPerPage;
            vm.filteredDocuments = documents.slice(begin, end);
        }

        function getAllDocumentsForDatabase(collectionName) {
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    CollectionService.getAllDocumentsForDatabase(currentUser.username,collectionName).then(
                        function (response) {
                            if(response.data) {
                                vm.documents = response.data;
                                console.log(response.data);
                                figureOutTodosToDisplay(response.data);
                            }
                        }, function (error) {
                            console.log(error);
                        }
                    );
                }, function(error){
                    console.log(error);
                });
        }

        vm.pageChanged = function() {
            figureOutTodosToDisplay(vm.documents);
        };


    }
})();