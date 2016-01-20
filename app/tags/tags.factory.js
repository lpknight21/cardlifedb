'use strict';

app.factory("Tags", function PostFactory(FIREBASE_URL, $firebaseArray) {
  return function(){
    // snapshot of our data
    var ref = new Firebase(FIREBASE_URL + 'tags');
    // returning synchronized array
    return $firebaseArray(ref);
  }
});

console.log('[ TagsFactory ]--> starterlog/app/tags/tags.Factory.js loaded');
