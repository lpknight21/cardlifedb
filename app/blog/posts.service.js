'use strict';

app.factory("Posts", function PostFactory(FIREBASE_URL, $firebaseArray) {
  return function(){
    // snapshot of our data
    var ref = new Firebase(FIREBASE_URL + 'posts');
    // returning synchronized array
    return $firebaseArray(ref);
  }
});

console.log('--> starterlog/app/blog/posts.service.js loaded');
