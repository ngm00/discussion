
          var moduleA = angular.module("MyModuleA", []);		  
		  
          moduleA.controller("MyControllerA", function($scope) {
			$scope.writepost=[];			
            $scope.boxShow = false;
			   
			$scope.addToList = function () {
				var newItem = $scope.bravtext;
				$scope.writepost.push(newItem);			
			};
			   
			//count no. of like button click
			$scope.like_counter= 0;
			$scope.likecount = function(inc){    
				$scope.like_counter += inc;
			};
			
			//count no. of comment button click
			$scope.comment_counter= 0;
			$scope.commentcount = function(inc){    
				$scope.comment_counter += inc;
			};
        });

        var moduleB = angular.module("MyModuleB", []);
		  
		moduleB.directive('fileModel', ['$parse', function ($parse) {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
              
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function(){
					scope.$apply(function(){
						modelSetter(scope, element[0].files[0]);
					});
				});
				}
			};
		}]);
		  
		moduleB.service('fileUpload', ['$http', function ($http) {
			this.uploadFileToUrl = function(file, uploadUrl){
				var fd = new FormData();
				fd.append('file', file);

				$http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				})
				.success(function(){
				})
			   .error(function(){
			   });
			}
		}]);
	 
        moduleB.controller("MyControllerB",['$scope','$http', 'fileUpload',
		function($scope,$http,fileUpload) {
			$scope.photodescription=[];
			$scope.files=[];			
            $scope.boxShow1 = false;
			   
			$scope.addToList = function () {
				var newItem = $scope.bravupload;
				$scope.photodescription.push(newItem);			
			};			   
			
			$scope.fileChanged=function(elm){
				$scope.myFile=elm.files[0];
				console.log($scope.myFile);
				$scope.$apply();
			}
			
			$scope.upload=function(){
				var fd=new FormData();
				var file=$scope.$myFile;
				var uploadUrl = "./upload";
           
				fileUpload.uploadFileToUrl(file, uploadUrl);
		   
				/*angular.forEach(file,function(file){
					fd.append('file',file)
				})
				$http.post('./upload',fd,
				{
				transformRequest:angular.identity,
				headers:{'content-type':'multipart/form-data'}
				})
				.success(function(d){
					cosole.log(d)
					})*/
					
				};
				
				$scope.sortComment = function(comment) {
					var date = new Date(file.created);
					return date;					
			   };

		}]);	  
         
		var moduleC = angular.module("MyModuleC", []);
		
		moduleC.controller("MyControllerC",['$scope','$filter',function($scope,$filter) {
            $scope.poll=[];	
			$scope.choices=[{id: '1'}, {id: '2'}, {id: '3'}];			
			$scope.options=[];
            $scope.boxShow2 = false;
			
			//add new text box			
			$scope.addNewChoice = function() {
				var newItemNo = $scope.choices.length+1;
				$scope.choices.push({'id':newItemNo});
			};
			
			//show new text box
			$scope.showAddChoice = function(choice) {
				return choice.id === $scope.choices[$scope.choices.length-1].id;
			};
			
			//create poll
			$scope.createpoll = function () {
				var newItem = {question: null, options: null};
				for(var i=0;i<$scope.choices.length;i++){
					$scope.options.push($scope.choices[i]);
					console.log($scope.options[i].name);
				}			  
				newItem.question = $scope.bravpoll;
				newItem.options = $scope.options;
					
				$scope.poll.push(newItem);	
				console.log(newItem);
				$scope.options=[];					
			};
			
			//count no. of button click
			$scope.counter= 0;
			$scope.count = function(inc){    
				$scope.counter += inc;
			};
			  
			$scope.selected=null; 
			
			//get which radio button selected
			$scope.getclick = function(value) {
				$scope.selected=value;
				console.log($scope.selected);
			}
				
			//vote count	
			 $scope.counters=[{id:null,count:0}];
			$scope.countvote = function () { 
			console.log("id:"+$scope.selected.id);					
	};		
			
    }]);
    