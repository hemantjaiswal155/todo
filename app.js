var serverpath = "http://183.182.84.84/MEAN/rahulg/";
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$http', '$timeout', function ($scope, $filter, $http, $timeout) {

    $scope.characters = 150;
    $scope.errorMessage = true;
    $scope.newRule = '';

    $http.get(serverpath+'backService.php')
        .success(function (result) {
            $scope.rules = result.todo;
            $scope.dones = result.done;
        })
        .error(function (data, status) {
            console.log(data);
        });

    
    $scope.addRule = function () {
     if($scope.newRule != ''){
	    var mydata = { "newRule": $scope.newRule };
	    $http.post(serverpath+'backService.php', mydata )
            .success(function (result) {
		if(result == 'false'){
                    $scope.errorMessage = false;
                   $timeout(function(){ $scope.errorMessage = true;},3000);
		}else{	
				$scope.rules = result.todo;
                $scope.dones = result.done;
				$scope.newRule = '';
	        }
            })
            .error(function (data, status) {
                console.log(data);
            });
     }    
    };
    
    $scope.deleteRule = function (id) {
	if(id != ''){
        bootbox.confirm("Are you sure you want to remove it?", function(result) {
            if(result == true){
                var mydata = { "id": id };
                $http.post(serverpath+'deleteSingle.php', mydata )
                .success(function (result) {
                    $scope.rules = result.todo;
                    $scope.dones = result.done;
                })
                .error(function (data, status) {
                    console.log(data);
                });
            }
        });
    }       
 };
 
    $scope.deleteAll = function () {
          bootbox.confirm("Are you sure you want to remove it?", function(result) {
            if(result == true){
                $http.post(serverpath+'deleteAll.php' )
                .success(function (result) {
                    $scope.rules = result.todo;
                    $scope.dones = result.done;
                })
                .error(function (data, status) {
                    console.log(data);
                });
            }
        });
    } 
        
   $scope.completeRule = function (id) {
       if(id != ''){
            bootbox.confirm("Are you sure you want to complete it?", function(result) {
                if(result == true){
                    var mydata = { "id": id };
                    $http.post(serverpath+'completeSingle.php', mydata )
                    .success(function (result) {
                        $scope.rules = result.todo;
                        $scope.dones = result.done;
                    })
                    .error(function (data, status) {
                        console.log(data);
                    });
                }
            });
        }       
   };
    
   $scope.editForm = function (id, todo_task) {
        $scope.editID = id;
        $scope.editTodoTask = todo_task;
    };
    
    $scope.editRule = function () {
     if($scope.editID != '' && $scope.editTodoTask != ''){
                    var mydata = { "editID": $scope.editID, "editTodoTask": $scope.editTodoTask };
                    $http.post(serverpath+'editSingle.php', mydata )
                    .success(function (result) {
                        if(result == 'false'){
                            $scope.errorMessage = false;
                            $timeout(function(){ $scope.errorMessage = true;},3000);
                        }else{  
                            $scope.rules = result.todo;
                            $scope.dones = result.done;
                        }
                        $timeout(function() { $("#myModal").modal('hide'); }, 2000);
                    })
                    .error(function (data, status) {
                        console.log(data);
                    });                
        }
    };


    $scope.enableEditor = function() {
        $scope.editorEnabled = true;
        $scope.editableTitle = $scope.title;
    };
}]);
