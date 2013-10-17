module.exports = '<section ng-hide="conversations.length">\n  <span >No conversations yet!</span>\n  <p>Click on People and pick someone to start talking to :)</p>\n</section>\n<input type="search" ng-model="conversation_search" placeholder="Search by name" ng-show="conversations.length">\n<ul ng-show="conversations.length">\n  <li\n    ng-class="{\'selected\': selectedConversation==conversation}"\n    ng-click="select(conversation)"\n    ng-repeat="conversation in filteredConversations = ( conversations | filter:conversation_search | orderBy:newMessageCount)">\n    <img ng-src="//graph.facebook.com/{{conversation.to.username}}/picture"\n      ng-class="{\'offline\': !conversation.to.status}" alt="">\n    <section>\n      <span>{{conversation.to.username}}</span>\n      <p>{{conversation.messages[conversation.messages.length-1].text.substr(0,30)+\'...\'}}</p>\n    </section>\n  </li>\n</ul>';