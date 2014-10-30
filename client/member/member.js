Session.setDefault('showmsgform', false);

Template.member.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Members");
	Meteor.subscribe("Users");

	})	
}

Template.member.Users= function(){
// ,{sort:{date:-1}
 	return Meteor.users.find({});   	
}

Template.member.showmsg= function(){

	return Session.get('showmsgform'); 
}

Template.memberProfile.membersInfoAll= function(){
	
 	return Members.find({parent:this._id});	  
}

Template.memberProfile.thisuser= function(){
	
	userId = Meteor.userId();
 	if(this._id ===userId )
		{
			var memId = null;
			
		}
		else
		{
			var memId = This.id;
		}

		return memId;	  
}

Template.memberProfile.profile = function(){

	return Members.findOne({parent:this._id});
}

Template.sendmessageform.ownerinfo = function(){
	
	return Members.findOne({parent:Session.get('msgmember')});
}

Template.sendmessageform.msgmember = function(){

	return Session.get('msgmember');
}


Template.memberProfile.events({
	
 	'click .sendmsg': function(evt, tmpl){
		Session.set('showmsgform',true);
		Session.set('msgmember',this._id);
	}

})

Template.sendmessageform.events({

	'click .send':function(evt, tmpl){
		
		var msgtext = tmpl.find('.msgtext').value;
		var reciveduser = Session.get('msgmember');
		var senduser = Meteor.userId();
		var senddatetime = new Date();

		var sendmsg ={ msgtext : msgtext,
						reciveduser : reciveduser,
						senduser:senduser,
						senddatetime: senddatetime
						};

		Meteor.call('sendmsg', sendmsg);
		alert('Message Sent');
		Session.set('showmsgform',false);
	},

	'click .close':function(evt, tmpl){
		Session.set('showmsgform',false);
	},
	
	'click .cancel':function(evt, tmpl){
	
		Session.set('showmsgform', false);
	}

})

