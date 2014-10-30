Chats.allow({
  insert: function (userId, chat) {
    if(userId){
      chat.createdAt = new Date();
      return true;
    }
  },
  update: function (userId, chat, fields, modifier) {
    if(userId){
      return true;
    }
  },
  remove: function (userId, chat) {
    if(userId){
      return true;
    }
  }
});