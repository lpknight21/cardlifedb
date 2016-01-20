'use strict';

var app = angular.module('starterlog', ['firebase','ui.bootstrap','ui.router', 'ngTable', 'textAngular'])
  .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      // BLOG
      .state('blog-posts', {
        url: '/blog/posts',
        controller: 'PostsCtrl as postsCtrl',
        templateUrl: 'blog/index.html',
        resolve: {
          alarms: function (Posts){
             return Posts();
           },
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          }
        }
      })
      .state('blog-post-create', {
        url: '/blog/posts/create',
        templateUrl: 'blog/create.html',
        controller: 'PostsCtrl as postsCtrl',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          }
        }
      })
      .state('blog-post-view', {
        url: '/blog/posts/view/{postId}',
        templateUrl: 'blog/view.html',
        controller: 'PostsCtrl as postsCtrl'
      })
      .state('blog-post-preview', {
        url: '/blog/posts/preview/{postId}',
        templateUrl: 'blog/preview.html',
        controller: 'PostsCtrl as postsCtrl'
      })
      .state('posts/edit', {
        url: '/blog/posts/edit/{postId}',
        templateUrl: 'blog/edit.html',
        controller: 'PostsCtrl as postsCtrl'
      })
      // Pages Content
      .state('pages-about', {
        url: '/pages/about',
        templateUrl: 'pages/about.html'
      })
      .state('pages-blog-home', {
        url: '/pages/blog-home',
        templateUrl: 'pages/blog-home.html'
      })
      .state('pages-blog-post', {
        url: '/pages/blog-post',
        templateUrl: 'pages/blog-post.html'
      })
      .state('pages-twitter-bootstrap-components', {
        url: '/pages/twitter-bootstrap-components',
        templateUrl: 'pages/twitter-bootstrap-components.html'
      })
      .state('pages-angular-bootstrap-directives', {
        url: '/pages/angular-bootstrap-directives',
        templateUrl: 'pages/angular-bootstrap-directives.html'
      })
      .state('pages-cover', {
        url: '/pages/cover',
        templateUrl: 'pages/cover.html'
      })
      .state('pages-1-column-portfolio', {
        url: '/pages/1-column-portfolio',
        templateUrl: 'pages/1-column-portfolio.html'
      })
      .state('pages-2-column-portfolio', {
        url: '/pages/2-column-portfolio',
        templateUrl: 'pages/2-column-portfolio.html'
      })
      .state('pages-3-column-portfolio', {
        url: '/pages/3-column-portfolio',
        templateUrl: 'pages/3-column-portfolio.html'
      })
      .state('pages-4-column-portfolio', {
        url: '/pages/4-column-portfolio',
        templateUrl: 'pages/4-column-portfolio.html'
      })
      .state('pages-landing', {
        url: '/pages/landing',
        templateUrl: 'pages/landing.html'
      })
      .state('pages-signin', {
        url: '/pages/signin',
        templateUrl: 'pages/signin.html'
      })
      .state('pages-signup', {
        url: '/pages/signup',
        templateUrl: 'pages/signup.html'
      })
      .state('pages-portfolio-item', {
        url: '/pages/portfolio-item',
        templateUrl: 'pages/portfolio-item.html'
      })
      .state('pages-product', {
        url: '/pages/product',
        templateUrl: 'pages/product.html'
      })
      .state('pages-thumbnail-gallery', {
        url: '/pages/thumbnail-gallery',
        templateUrl: 'pages/thumbnail-gallery.html'
      })
      .state('pages-welcome', {
        url: '/pages/welcome',
        templateUrl: 'pages/welcome.html'
      })
      .state('docs-configuration', {
        url: '/docs/configuration',
        templateUrl: 'docs/configuration.html'
      })
      .state('docs-contoller', {
        url: '/docs/controller',
        templateUrl: 'docs/controller.html'
      })
      .state('docs-factory', {
        url: '/docs/factory',
        templateUrl: 'docs/factory.html'
      })
      .state('get-started', {
        url: '/get-started',
        templateUrl: 'static/get-started.html'
      })
      .state('home', {
        url: '/',
        templateUrl: 'static/home.html'
      });
    // $stateProvider
    //   .state('home', {
    //     url: '/home',
    //     templateUrl: 'pages/home.html',
    //     resolve: {
    //       requireNoAuth: function($state, Auth){
    //         return Auth.$requireAuth().then(function(auth){
    //           $state.go('home');
    //         }, function(error){
    //           return;
    //         });
    //       }
    //     }
    //   });
    $urlRouterProvider.otherwise('/');
  })
.constant('FIREBASE_URL', 'https://starterlog-org.firebaseio.com/');

console.log('[ Core App Module ]--> starterlog/app/app.js loaded');
