Meteor.publish("Posttexts",function(userid){

	return Posttexts.find({});
	
})

Meteor.publish("Users",function(){
	
	return Meteor.users.find({});
	
})

Meteor.publish("Members",function(){
	
	return Members.find({});	
})


Meteor.publish("Events",function(){
	return Events.find({});
})

Meteor.publish("Duties",function(){
	return Duties.find({});
})

Meteor.publish("Likes",function(){
	return Likes.find({});
})

Meteor.methods({
	
		'addPost':function(options){
	
	var post =	{
	text:options.text,
	owner:Meteor.userId(),
	date:new Date(),
	parent:options.parent
	}
	Posttexts.insert(post);
	
	},
	
		'removePost':function(id){
		Posttexts.remove({_id:id});
	},

		'addPostlikes':function(uid,postid){

		var postlike = { postid : postid,
				 uid : uid };

		Likes.insert(postlike);
	},

		'removePostlikes':function(id){

		Likes.remove(id);
	},

		'removeAllPosts':function(id){
		Posttexts.remove({});
	},

	'addEvent':function(options){
	
	var event = {
			eventname:options.eventname,
			eventdatetime:options.eventdatetime,
			venue:options.venue,
			client:options.client,
 			contact:options.contact,
			eventcordinator:options.eventcordinator,
			eventstatus:options.eventstatus,
			addeddate:options.addeddate,
			userId:options.userid
						};

			Events.insert(event);
		} ,

	'removeEvent':function(id){
		
		Events.remove(id);
	},

	'updateEvent' : function(event,id){
	
	var event = {
			eventname:event.eventname,
			eventdatetime:event.eventdatetime,
			venue:event.venue,
			client:event.client,
 			contact:event.contact,
			eventcordinator:event.eventcordinator,
			eventstatus:event.eventstatus,
			addeddate:event.addeddate,
			userId:event.userid
						};
	
			Events.update(id,event);
	
						return true;

},


	'removeAllEvents':function(){
		Events.remove({});
	},

	'saveProfile' : function(profile){
	
	var profile = {
			name:profile.name,
			mobile:profile.mobile,
			twitterid:profile.twitterid,
			faculty:profile.faculty,
			job:{photo: profile.job.photo,
			aw : profile.job.aw, it :profile.job.it,
			hr:profile.job.hr, mkt:profile.job.mkt,
			fin:profile.job.fin},
			adminrole:profile.adminrole,
			addeddate:profile.addeddate,
			parent:profile.parent
			};
			
			Members.insert(profile);
			return true;
	},

	'updateProfile' : function(profile){
	var id = profile.id;
	
	var profile = {
			name:profile.name,
			mobile:profile.mobile,
			twitterid:profile.twitterid,
			faculty:profile.faculty,
			job:{photo: profile.job.photo,
			aw : profile.job.aw, it :profile.job.it,
			hr:profile.job.hr, mkt:profile.job.mkt,
			fin:profile.job.fin},
			adminrole:profile.adminrole,
			addeddate:profile.addeddate,
			parent:profile.parent
			};
			
			Members.update(id,profile);
			return true;
	},

			'removeMemProf':function(uid){

			Members.remove({_id:uid});
	},

	'addUser' : function(profile){
	
	var profile = {
			username:profile.uname,
			email:profile.email,
			password:profile.password,			
			};

						
			Accounts.createUser(profile);
						return true;
},


	'changeuserpassword' : function(userId,newPassword){
						
			Accounts.setPassword(userId, newPassword)
						return true;
},
	'removeUser':function(uid){
		Meteor.users.remove({_id:uid});
		Members.remove({parent:uid});
	},

	'userLoggin' : function(login){

	var email= login.email;
	var password= login.password;
	
	
},
	'addDutie':function(options){
	
	var confirm = 'no';
	var dutie = {dutiename:options.dutiename,
			dutiedesc:options.dutiedesc,
			event:options.event,
			datetime:options.datetime,
			member:options.member,
			dutiestatus:options.dutiestatus,
			addeddate:options.addeddate,
			confirmation: confirm
			};

			Duties.insert(dutie);
		},

	'updateDutie':function(options,id){

	var updatedatadutie = {dutiename:options.dutiename,
			dutiedesc:options.dutiedesc,
			event:options.event,
			datetime:options.datetime,
			member:options.member,
			dutiestatus:options.dutiestatus,
			addeddate:options.addeddate,
			};
	
			Duties.update(id,updatedatadutie);
},

	'deleteDutie':function(id){

			Duties.remove({_id:id});
}

})



