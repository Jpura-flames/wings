Template.messages.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Members");
	Meteor.subscribe("Users");
	Meteor.subscribe("Messages");
	})	
}


Template.messages.gotMessages= function(){
 
 	return Messages.find({reciveduser:Meteor.userId()},{sort:{senddatetime:-1}});   
}

Template.msgbody.sentDate= function(){
 	var msgData = Messages.findOne({_id:this._id}); 
 	alert(msgData.senddatetime); 
 	var msgtDate = msgData.senddatetime.substring(10);
 	alert(msgtDate);

 	return msgtDate;   
}

Template.msgbody.sendprofile = function(){
	
	
	var msgData = Messages.findOne({_id:this._id}); 
	var memData = Members.findOne({parent:msgData.senduser});

	return memData.name;
}

Template.msgbody.recievedprofile = function(){
	
	var msgData = Messages.findOne({_id:this._id}); 
	var memData = Members.findOne({parent:msgData.reciveduser});

	return memData.name;
}


