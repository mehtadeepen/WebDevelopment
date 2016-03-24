(function(){
    angular
        .module("SpiderMongo")
        .controller("CollectionViewController", CollectionViewController);

    function CollectionViewController(CollectionService, $routeParams, $location, UserService) {

        var vm = this;
        vm.find = find;
        vm.filteredDocuments = [];
        vm.itemsPerPage = 2;
        vm.currentPage = 4;



        console.log("In CollectionViewController ");

        function init() {
            vm.$location = $location;
            console.log($routeParams.name);
            vm.collectionName = $routeParams.name;
            getAllDocumentsForDatabase($routeParams.name);

        }
        init();

        function find(search,collectionName) {
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    CollectionService.findDocumentsFromCollectionForUser(currentUser.username,collectionName,search).then(
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
                                vm.searchKeys = getSearchKeys(response.data);
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


        function getSearchKeys(documents){
            var searchKeys = [];
            for(var d in documents) {
                for (var key in documents[d]) {
                    if (documents[d].hasOwnProperty(key) && key != "_id") {
                        searchKeys.push(key);
                    }
                }
            }

            return removeDuplicates(searchKeys);

        }


        function removeDuplicates(keys) {
            return _.reduce(keys, function(list, elem) {
                if (list.indexOf(elem) == -1) {
                    list.push(elem);
                }
                return list;
            }, []);
        }


    }
})();