/**
 * @name compose.controllers:compose
 */
angular.module('mme.messages')
  .controller('conversations',['$scope', 'OnlineUsersService', 'UserService', 'ConversationService', 'Notification'
  , function ($scope, OnlineUsersService, UserService, ConversationService, Notification) {


    $scope.me = false;
    $scope.users = [];
    $scope.message = null;
    $scope.currentList = 'conversations';
    $scope.conversations = [];
    $scope.selectedUsers = [];
    $scope.selectedConversation = false;

    UserService.getUser().then(function (me) {
      console.log(me);
      $scope.me = {
        _id: me._id,
        username: me.username,
        facebook: me.facebook
      };
    });

    $scope.$watch('currentList', function (cl) {
      if(cl==='people') {
        $scope.conversations.forEach(function (c) {
          c.selected = false;
        });
        $scope.selectedConversation = null;
      } else if (cl==='conversations') {
        Notification.checkPermission()
        $scope.selectedUsers = [];
        $scope.users.forEach(function (u) {
          u.marked = false;
        });
      }
    })

    $scope.$watch('conversations', function (conversations) {
      console.log(conversations);
    }, true);

    $scope.$watch('users', function (users) {
      // console.log(users);
    }, true);

    $scope.$watch('selectedUsers', function (users) {
      if(users.length === 0) {
        $scope.message = null;
      }
    }, true);

    $scope.send = function () {
      var message = {
        text: $scope['message']
      };
      $scope.message = null;
      $scope.selectedConversation.messages.unshift({
        text: message.text,
        from: $scope.selectedConversation.to._id === $scope.me._id && $scope.me || $scope.selectedConversation.from,
      });
      console.log($scope.me._id, $scope.selectedConversation);
      ConversationService.sendMessage($scope.selectedConversation._id, message)
        .then(function (m) {
          // do something with the message
        });
    }

    $scope.start = function () {
      var to = $scope.selectedUsers.map(function (user) {
         return user._id;
        });

      var message = {
        text: $scope['message']
      };

      ConversationService.start({
        to: to
      }).then(function (conversations) {
        $scope.message = null;
        conversations.forEach(function (c) {
          to.forEach(function (t) {
            if(t === c.to) {
              c.to = $scope.selectedUsers.filter(function (u) {
                return c.to === u._id;
              })[0];
              c.messages.unshift({
                text: message.text,
                from: $scope['me'],
                to:   c.to
              });
            }
          });
        });
        $scope.conversations = $scope.conversations.concat(conversations).reverse();
        $scope.currentList = 'conversations';
        conversations.forEach(function (c) {
          console.lo
          ConversationService.sendMessage(c._id, message)
            .then(function (m) {
              // do something with the message
            });
        });
      });
    };
  }]);