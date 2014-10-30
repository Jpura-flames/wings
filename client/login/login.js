Template.login.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Members");
	Meteor.subscribe("Users");
	})	
}

Template.login.events({

'click .userlogin':function(evt, tmpl){

		var usermail =tmpl.find('.usermail').value;
		var pword = tmpl.find('.password').value;

		Meteor.loginWithPassword(usermail, pword);
	},

	'click .logout':function(evt, tmpl){
		
		Meteor.logout();
	}

})

Template.login.memberData = function(){
	var uid = Meteor.userId();
	return Meteor.users.findOne({_id:uid});
}	

Template.login.memberProfileData = function(){
	
	var uid = Meteor.userId();
	var profile = Members.findOne({parent:uid});

	return profile;
}	