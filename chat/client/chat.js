Template.chat.events({
  'click #chat-submit': function (e) {
    var chatMessage = $('#chat-message').val();
    $('#chat-message').val('');
    Chats.insert({
      chatMessage: chatMessage,
      userId: Meteor.userId()
    }); 
  }
});

Template.chat.messages = function(){
  return Chats.find({});
}
Template.chat.relativeTime = function(){
  return RelativeTime(new Date(), this.createdAt);
};