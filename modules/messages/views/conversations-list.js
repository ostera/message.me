module.exports = '<span ng-hide="conversations.length">No conversations yet!</span>\n<p>Click on People and pick someone to start talking to :)</p>\n<ul ng-show="conversations.length">\n  <li\n    ng-class="{\'selected\': selectedConversation==conversation}"\n    ng-click="selectedConversation = conversation"\n    ng-repeat="conversation in conversations | orderBy:newMessageCount">\n    <img ng-src="//graph.facebook.com/{{conversation.to.username}}/picture" alt="">\n    <span>{{conversation.to.username}}</span>\n    <p>{{conversation.messages.pop().substr(120)+\'...\'}}</p>\n  </li>\n</ul>';