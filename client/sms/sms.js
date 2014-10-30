if(Meteor.isClient){

Template.sms.events({  
  
  'click .sendmsg': function(evt,tmpl){

    

    var txtmsg ='hello chuma';
    Meteor.call('sendsms',txtmsg);
  }

})


}
