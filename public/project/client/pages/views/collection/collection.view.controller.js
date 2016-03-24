(function(){
    angular
        .module("SpiderMongo")
        .controller("CollectionViewController", CollectionViewController);

    function CollectionViewController(CollectionService, $routeParams, $location, UserService, sweet) {

        var vm = this;
        vm.find = find;
        vm.deleteDocument = deleteDocument;
        vm.filteredDocuments = [];
        vm.itemsPerPage = 3;
        vm.currentPage = 4;

        console.log("In CollectionViewController ");

        function init() {
            vm.$location = $location;
            console.log($routeParams.name);
            vm.collectionName = $routeParams.name;
            vm.database = $routeParams.databaseName;
            getAllDocumentsForDatabase($routeParams.name);

        }
        init();

        function deleteDocument(documentId) {
            sweet.show({
                title: 'Delete this document ?',
                text: 'It cannot be reverted.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: true
            }, function() {
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    CollectionService.deleteDocumentFromCollectionForUser(currentUser.username,vm.collectionName,documentId).then(
                        function (response) {
                            if(response.data) {
                                getAllDocumentsForDatabase(vm.collectionName);
                            }
                        }, function (error) {
                            console.log(error);
                            sweet.show('Oops...', error.data.message , 'error');
                        }
                    );
                }, function(error){
                    console.log(error);
                    sweet.show('Oops...', error.data.message , 'error');
                });
            });
        }

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