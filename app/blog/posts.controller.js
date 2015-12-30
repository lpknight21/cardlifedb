'use strict';

app.controller("PostsCtrl", function($state, $scope, FIREBASE_URL, $firebaseObject, $firebaseArray, $stateParams, ngTableParams, $filter, Posts) {

    $scope.posts = Posts();

    // CORE CRUD FUNCTIONALITY
    // - CREATE ($add firebaseObject to synchronized firebaseArray)
    // - READ (get firebaseObject using stateParams and Firebase Reference)
    // - UPDATE ($save firebaseObject)
    // - DELETE ($remove firebaseObject)

    // CREATE - ADD A NEW POST TO FIREBASE
    $scope.create = function(post) {
      $scope.posts.$add(post).then(function() {
        console.log('Blog Post Created');

        //$location.path('/posts');
        $state.go('blog-posts');

      }).catch(function(error) {
        console.log(error);
      });
    };

    // READ - GET A POST FROM FIREBASE ON PAGE INIT FOR /posts/edit/:id route
    $scope.getPost = function() {
      var ref = new Firebase(FIREBASE_URL + 'posts');
      $scope.post = $firebaseObject(ref.child($stateParams.postId));
    };

    // UPDATE - EDIT A POST AND SAVE IT TO FIREBASE
    $scope.update = function() {
      // save firebaseObject
      $scope.post.$save().then(function(){
        console.log('Blog Post Updated');

        // redirect to /posts path after update
        $state.go('blog-posts');
      }).catch(function(error){
        console.log(error);
      });
    };

    // DELETE - REMOVE A POST FROM FIREBASE
    $scope.delete = function(post) {
        $scope.posts.$remove(post).then(function(){
            console.log('Post Deleted');

            // redirect to /posts path after delete
            $state.go('blog-posts');
        }).catch(function(error){
            console.log(error);
        });
    };


    // DATA TABLE SYNCHRONIZATION USING NG-TABLE

    // Since the data is asynchronous we'll need to use the $loaded promise.
    // Once data is available we'll set the data variable and init the ngTable
    $scope.posts.$loaded().then(function(posts) {
      console.log(posts.length); // data is loaded here
      var data = posts;

      $scope.tablePosts = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: { title: 'asc' }    // initial sorting
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ? $filter('filter')(data, params.filter()) : data;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

    });

    // Listening for list updates to Posts to update DataTable
    var ref = new Firebase(FIREBASE_URL + 'posts');
    var list = $firebaseArray(ref);
    list.$watch(function(event) {
      console.log(event);
      $scope.posts.$loaded().then(function(){
        $scope.tablePosts.reload();
      });
    });

});

console.log('--> starterlog/app/blog/posts.controller.js loaded');
