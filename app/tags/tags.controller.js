'use strict';

app.controller("TagsCtrl", function($state, $scope, FIREBASE_URL, $firebaseObject, $firebaseArray, $stateParams, ngTableParams, $filter, Tags) {

    $scope.tags = Tags();

    // CORE CRUD FUNCTIONALITY
    // - CREATE ($add firebaseObject to synchronized firebaseArray)
    // - READ (get firebaseObject using stateParams and Firebase Reference)
    // - UPDATE ($save firebaseObject)
    // - DELETE ($remove firebaseObject)

    // CREATE - ADD A NEW TAG TO FIREBASE
    $scope.create = function(tag) {
      tag.createdAt = new Date().toString();
      $scope.tags.$add(tag).then(function() {
        console.log('[ TagsCtrl ] --> Tag Created');

        // redirect to /tags path after create
        $state.go('tags');

      }).catch(function(error) {
        console.log(error);
      });
    };

    // READ - GET A TAG FROM FIREBASE ON PAGE INIT FOR /tags/edit/:id route
    $scope.getTag = function() {
      var ref = new Firebase(FIREBASE_URL + 'tags');
      $scope.tag = $firebaseObject(ref.child($stateParams.tagId));
    };

    // UPDATE - EDIT A TAG AND SAVE IT TO FIREBASE
    $scope.update = function() {
      // save firebaseObject
      $scope.tags.$save().then(function(){
        console.log('[ TagsCtrl ] --> Tag Updated');

        // redirect to /tags path after update
        $state.go('tags');
      }).catch(function(error){
        console.log(error);
      });
    };

    // DELETE - REMOVE A TAG FROM FIREBASE
    $scope.delete = function(tag) {
        $scope.tags.$remove(tag).then(function(){
            console.log('[ TagsCtrl ] --> Post Deleted');

            // redirect to /tags path after delete
            $state.go('tags');
        }).catch(function(error){
            console.log(error);
        });
    };


    // DATA TABLE SYNCHRONIZATION USING NG-TABLE

    // Since the data is asynchronous we'll need to use the $loaded promise.
    // Once data is available we'll set the data variable and init the ngTable
    $scope.tags.$loaded().then(function(tags) {
      console.log(tags.length); // data is loaded here
      var data = tags;

      $scope.tableTags = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: { name: 'asc' }    // initial sorting by tag name
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ? $filter('filter')(data, params.filter()) : data;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

    });

    // Listening for list updates to Tags to update DataTable
    var ref = new Firebase(FIREBASE_URL + 'tags');
    var list = $firebaseArray(ref);
    list.$watch(function(event) {
      console.log(event);
      $scope.tags.$loaded().then(function(){
        $scope.tableTags.reload();
      });
    });

});

console.log('[ TagsController]--> starterlog/app/tags/tags.controller.js loaded');
