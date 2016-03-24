(function(){
    angular
        .module("SpiderMongo")
        .controller("DocumentAddController", DocumentAddController);

    function DocumentAddController(CollectionService, $routeParams, $location, UserService) {

        var vm = this;
        vm.localAdd = localAdd;
        vm.localDelete = localDelete;
        vm.commit = commit;
        vm.database = $routeParams.databaseName;
        console.log("In DocumentAddController ");

        function init() {
            vm.$location = $location;
            console.log($routeParams.collectionName);
            vm.collectionName = $routeParams.collectionName;
            getAllDocumentsForDatabase($routeParams.collectionName);

        }
        init();

        function commit(document) {
            console.log(document);
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    CollectionService.insertDocumentInCollectionForUser(currentUser.username,vm.collectionName,document).then(
                        function (response) {
                            if(response.data) {
                                $location.url("/collection/"+vm.collectionName+"/database/"+vm.database);
                            }
                        }, function (error) {
                            console.log(error);
                        }
                    );
                }, function(error){
                    console.log(error);
                });
        }

        function localAdd(pair) {
            if(pair && pair["key"]) {
                vm.searchKeys.push(pair["key"]);
            }
            vm.add.key = "";
        }

        function localDelete(index) {
           vm.searchKeys.splice(index,1);
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