(function(){
    angular
        .module("SpiderMongo")
        .controller("DocumentEditController", DocumentEditController);

    function DocumentEditController(CollectionService, $routeParams, $location, UserService) {

        var vm = this;
        vm.localAdd = localAdd;
        vm.localDelete = localDelete;
        vm.update = update;
        console.log("In DocumentEditController ");

        function init() {
            vm.$location = $location;
            console.log($routeParams.collectionName);
            vm.collectionName = $routeParams.collectionName;
            vm.documentId = $routeParams.id;
            getDocumentFromCollectionForUser($routeParams.collectionName,$routeParams.id);

        }
        init();

        function update(document,documentId) {
            console.log(document,documentId);
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    CollectionService.updateDocumentInCollectionForUser(currentUser.username,
                        vm.collectionName,document,documentId).then(
                        function (response) {
                            if(response.data) {
                                $location.url("/collection/"+vm.collectionName);
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
                vm.document[pair["key"]] = "";
            }
            vm.add.key = "";
        }

        function localDelete(key) {
            delete vm.document[key];
        }

        function getDocumentFromCollectionForUser(collectionName,documentId) {
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    CollectionService.getDocumentFromCollectionForUser(currentUser.username,collectionName,documentId).then(
                        function (response) {
                            if(response.data) {
                                vm.document = response.data;
                                console.log(response.data);
                                delete vm.document._id;
                            }
                        }, function (error) {
                            console.log(error);
                        }
                    );
                }, function(error){
                    console.log(error);
                });
        }

    }
})();