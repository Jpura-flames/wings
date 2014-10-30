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

Meteor.publish('chats', function(){
	return Chats.find({}, {sort: {createdAt: -1}});
});

Meteor.publish("Messages",function(){
	return Messages.find({});
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
		check(profile, Match.Any)

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

	'changeusername' : function(userId,uname){
						
				var profile = {
								username:uname,
								}		
			Meteor.users(userId, profile)
						return true;
},


	'removeUser':function(uid){
		Meteor.users.remove({_id:uid});
		Members.remove({parent:uid});
	},

	'userLoggin' : function(email,password){
		var pw = password;

	Meteor.loginWithPassword(email, pw);
	
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
			admin:Meteor.userId(),
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
			addeddate:options.addeddate
			};
	
			Duties.update(id,updatedatadutie);
},

'updateDutie2':function(id,duti){
		var updatedutie ={dutiename:duti.dutiename,
			dutiedesc:duti.dutiedesc,
			event:duti.event,
			datetime:duti.datetime,
			member:duti.member,
			dutiestatus:duti.dutiestatus,
			addeddate:duti.addeddate
		};
			Duties.update(id,updatedutie);
},

	'deleteDutie':function(id){

			Duties.remove({_id:id});
},
	'sendmsg':function(sendmsg){

			Messages.insert(sendmsg);

},

	'sendsms':function(sendmsg,phnnumber){

	var ACCOUNT_SID = 'ACa4b5c3569649439acd2703053ab4bca7';
	var AUTH_TOKEN = '3c89fda0b5cb78814a0173c60c694c42';

	var twilio = Twilio(ACCOUNT_SID, AUTH_TOKEN);

	twilio.sendSms({
    to:phnnumber, // Any number Twilio can deliver to
    from: '+15015880376', // A number you bought from Twilio and can use for outbound communication
    body: sendmsg // body of the SMS message
  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if (!err) { // "err" is an error received during the request, if any
      // "responseData" is a JavaScript object containing data received from Twilio.
       //A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
       //http://www.twilio.com/docs/api/rest/sending-sms#example-1
      console.log(responseData.from); // outputs "+14506667788"
      console.log(responseData.body); // outputs "word to your mother."  '
    
    }
});


}

})