(function(){
	angular
		.module("SpiderMongo")
		.controller("ConnectionController", ConnectionController)
        .controller("ConnectionAddController", ConnectionAddController)
        .controller("ConnectionEditController", ConnectionEditController);

    function ConnectionEditController ($location, ConnectionService, $routeParams, sweet) {

        console.log("In Edit Connection Controller");
        var vm = this;
        vm.updateConnection = updateConnection;
        function init() {

            vm.$location = $location;
            getConnectionById($routeParams.ID);
        }
        init();

        function getConnectionById(connectionID) {
            console.log(connectionID);
            ConnectionService.findConnectionById(connectionID).then(
                function (response) {
                    vm.connection = response.data;
                }, function (error) {
                    console.log(error);
                }
            );
        }

        function updateConnection(connection) {
            console.log(connection);
            ConnectionService.updateConnectionById(connection).then(
                function (response) {
                    console.log("Edited Succesfully",response.data);
                    sweet.show('Updated', "Connection updated" , 'success');
                    $location.url("/connections");
                }, function (error) {
                    console.log(error);
                }
            );
        }
    }

    function ConnectionAddController ($location, ConnectionService) {

        console.log("In Add Connection Controller");
        var vm = this;
        vm.addConnection = addConnection;
        function init() {
            vm.$location = $location;
        }
        init();

        function addConnection(connection,username) {
            console.log(connection,username);
            ConnectionService.addConnectionMeta(username,connection).then(
                function (response) {
                    console.log("Added Succesfully",response.data);
                    $location.url("/connections");
                }, function (error) {
                    console.log(error);
                    vm.error = true;
                }
            );
        }
    }

	function ConnectionController($location, ConnectionService, UserService, $rootScope, sweet) {

        console.log("In Connection Controller");
		var vm = this;
        vm.enabledConnection = enabledConnection;


        vm.doConnect = doConnect;
        vm.doDisonnect = doDisonnect;
        vm.deleteConnection = deleteConnection;
        vm.enableConnection = enableConnection;
        vm.disableConnection = disableConnection;
        vm.renderSiderbar = renderSiderbar;
        

        function init() {
        	 vm.$location = $location;
             getConnectionsForUser();
        }
        init();

        function getConnectionsForUser() {
            UserService.getCurrentUser().then(
                function(response){
                    var currentUser = response.data;
                    ConnectionService.findAllConnectionForUserId(currentUser.username).then(
                        function(response) {
                            //ConnectionService.setConnections(response.data);
                            vm.allConnections = response.data;
                        }, function (error) {
                            console.log(error);
                        });
                    }, function(error){
                        console.log(error);
                });
        }

        function enabledConnection (connection) {
            return connection.enabled;
        }

        function doConnect(connectionID) {
            console.log(connectionID);
            ConnectionService.doConnectionById(connectionID).then(
                function(response) {
                    if(response.data) {
                        ConnectionService.setConnected(true);
                        $rootScope.connectedTo = response.data;
                        console.log("connection successful");
                        sweet.show({
                            title: 'Bingo !!',
                            text: 'You\'re now connected.',
                            timer: 3000,
                            type: 'success',
                            showConfirmButton: false
                        });
                        getConnectionsForUser();
                    }
                }, function (error) {
                    console.log(error);
                    sweet.show('Oops...', error.data.message , 'error');
                }
            );


        }

        function doDisonnect(connectionID) {
            console.log(connectionID);
            ConnectionService.doDisConnectById(connectionID).then(
                function (response) {
                    if(response.data) {
                        ConnectionService.setConnected(false);
                        console.log("dis connection successful");
                        getConnectionsForUser();
                        sweet.show('Byee', 'You\'re now disconnected', 'success');
                    }
                }, function (error) {
                    console.log(error);
                    sweet.show('Oops...', error.data.message , 'error');
                }
            );
        }

        function deleteConnection(connectionID) {
            sweet.show({
                title: 'Confirm',
                text: 'Delete this connection?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: true
            }, function() {
                console.log(connectionID);
                ConnectionService.deleteConnectionById(connectionID).then(
                    function (response) {
                        if(response.data) {
                            console.log(response.data);
                            console.log("deleting successful");
                            sweet.show('Deleted!', 'The connection has been deleted.', 'success');
                            getConnectionsForUser();
                        }
                    }, function (error) {
                        console.log(error);
                        sweet.show('Oops...', error.data.message , 'error');
                    }
                );

            });
        }

        function disableConnection(connectionID) {
            console.log(connectionID);
            ConnectionService.disableConnectionById(connectionID).then(
                function (response) {
                    if(response.data) {
                        console.log(response.data);
                        console.log("disableConnection successful");
                        getConnectionsForUser();
                    }
                }, function (error) {
                    console.log(error);
                    sweet.show('Oops...', error.data.message , 'error');
                }
            );
        }

        function enableConnection(connectionID) {
            console.log(connectionID);
            ConnectionService.enableConnectionById(connectionID).then(
                function (response) {
                    if(response.data) {
                        console.log(response.data);
                        console.log("enable successful");
                        getConnectionsForUser();
                    }
                }, function (error) {
                    console.log(error);
                    sweet.show('Oops...', error.data.message , 'error');
                }
            );
        }

        function renderSiderbar() {
            $("#side-menu").metisMenu();
        }
	}
})();