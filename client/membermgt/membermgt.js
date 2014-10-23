
Session.setDefault('showprofform', false);
Session.setDefault('showaddmemform', false);
Session.setDefault('memberdelform',false);
Session.setDefault('memberprofeditstate',true);
Session.setDefault('showchangepwform',false);
Template.membermgt.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Members");
	Meteor.subscribe("Users");
	})	
}

Template.membermgt.Users= function(){
// ,{sort:{date:-1}
 	return Meteor.users.find({});   
}

Template.membermgt.showchangepwform = function(){

	return Session.get('showchangepwform');
}
Template.membermgt.showprofform = function(){

	return Session.get('showprofform');
}

Template.membermgt.showaddmemform = function(){

	return Session.get('showaddmemform');
}

Template.membermgt.memberdelform = function(){

	return Session.get('memberdelform');
}

Template.membermgt.memberprofeditstate = function(){
	Session.set('memberprofeditstate',true);
	var fan = Session.get('memberprofeditstate');
	alert(fan);
	return Session.get('memberprofeditstate');
}
Template.membermgtProfile.membersInfoAll= function(){
	
 	return Members.find({parent:this._id});	  
}


Template.membermgtProfile.membersInfocheck= function(){
 	var profile = Members.findOne({parent:this._id});
	var id = profile._id;
	//alert(profile._id);

	if(id=== null )
	{
		var check = true;		
	}
	else
	{	
		var check = false;
	}
	
	return check;
		  
}

Template.membermgt.events({
	'click .addmember':function(evt, tmpl){
		Session.set('showaddmemform',true);
}

})

Template.membermgtProfile.events({

	'click .save':function(evt, tmpl){
		Session.set('memberdata',tmpl.data._id);
		Session.set('showprofform',true);
},

	'click .update':function(evt, tmpl){
		Session.set('memberdata',tmpl.data._id);
		Session.set('showprofform',true);
},

	'click .chngpw':function(evt, tmpl){
				
		Session.set('memberdeldata',tmpl.data._id);
		Session.set('showchangepwform',true);
},
	'click .close':function(evt, tmpl){
		Session.set('memberdelform',tmpl.data._id);
}
	
})


Template.memberprofinfo.events({

	'click .close':function(evt, tmpl){
		var id =tmpl.data._id;
		Meteor.call('removeMemProf',id);

	},

	'click .update':function(evt, tmpl){
		Session.set('memberdata',tmpl.data._id);
		//alert(Session.get('memberdata',tmpl.data._id))
		Session.set('showprofform',true);
}
})

Template.profileForm.events({

	'click .save': function(evt, tmpl){

	var name = tmpl.find('.name').value;
	var mobile = tmpl.find('.mobile').value;
	var twitterid = tmpl.find('.twitterid').value;
	var faculty = tmpl.find('.faculty').value;
	var adminrole = tmpl.find('.adminroles').value;
	var addeddate = new Date();
	var id = Session.get('memberdata');
	
	var photo = tmpl.find('.pg').checked;
	var aw = tmpl.find('.aw').checked;
	var it = tmpl.find('.it').checked;
	var hr = tmpl.find('.hr').checked;
	var mkt = tmpl.find('.mkt').checked;
	var fin = tmpl.find('.fin').checked;

	var profile = {name:name,
			mobile:mobile,
			twitterid:twitterid,
			faculty:faculty,
			job:{photo: photo,
			aw : aw, it :it,
			hr:hr, mkt:mkt,
			fin:fin},
			adminrole:adminrole,
			addeddate:addeddate,
			parent:id	
			};

		Meteor.call('saveProfile',profile);
		Session.set('showprofform', false);
		
		
},
	'click .update': function(evt, tmpl){
	
	var name = tmpl.find('.name').value;
	var mobile = tmpl.find('.mobile').value;
	var twitterid = tmpl.find('.twitterid').value;
	var faculty = tmpl.find('.faculty').value;
	var addeddate = new Date();
	var parent = Session.get('memberdata');
	var adminrole = tmpl.find('.adminroles').value;
	var profile = Members.findOne({parent:Session.get('memberdata')});;
	var id = profile._id;

	var photo = tmpl.find('.pg').checked;
	var aw = tmpl.find('.aw').checked;
	var it = tmpl.find('.it').checked;
	var hr = tmpl.find('.hr').checked;
	var mkt = tmpl.find('.mkt').checked;
	var fin = tmpl.find('.fin').checked;
	
	var profile = { id:id,
			name:name,
			mobile:mobile,
			twitterid:twitterid,
			faculty:faculty,
			job:{photo: photo,
			aw : aw, it :it,
			hr:hr, mkt:mkt,
			fin:fin},
			adminrole:adminrole,
			parent:	parent
			};

		Meteor.call('updateProfile',profile);
		Session.set('showprofform', false);
		
		
},

	'click .cancel':function(evt, tmpl){
	
	Session.set('showprofform', false);
},

	'click .close':function(evt, tmpl){
	Session.set('showprofform', false);
}

})

Template.profileForm.profile = function(){
	return Members.findOne({parent:Session.get('memberdata')});
}

Template.membermgtProfile.profile = function(){
	return Members.findOne({parent:this._id});
}

Template.profileForm.rendered = function(){

	var mem = Members.findOne({parent:Session.get('memberdata')});
	
	$('.faculty').val(mem.faculty);
	$('.adminroles').val(mem.adminrole);

	var photo = mem.job.photo;
	var aw = mem.job.aw;
	var it = mem.job.it;
	var hr = mem.job.hr;
	var fin = mem.job.fin;
	var mkt = mem.job.mkt;	


	if(photo === true)
	{
		this.find('.pg').checked=true;
	}

	if(aw === true)
	{
		this.find('.aw').checked=true;
	}
	
	if(it === true)
	{
		this.find('.it').checked=true;
	}
	
	if(hr === true)
	{
		this.find('.hr').checked=true;
	}

	if(fin === true)
	{
		this.find('.fin').checked=true;
	}

	if(mkt === true)
	{
		this.find('.mkt').checked=true;
	}
}
Template.addMemberForm.events({

	'click .save': function(evt, tmpl){
	

	var name =  tmpl.find('.name').value;
	var uname = tmpl.find('.uname').value;
	var email = tmpl.find('.e-mail').value;
	var password = tmpl.find('.password1').value;
	var repassword = tmpl.find('.password2').value;
	if(name=== "" || uname === "" || email === '' || password === '' || repassword === ''  ){	
		alert("Form Data Cannot be null!!");
	}else
	{		
		if(password === repassword  ){

		var profile = {uname:uname,
				email:email,
				password:password,	
				};


		Meteor.call('addUser',profile);
		Session.set('showaddmemform', false);
		
		}else
		{
			alert("Password Mismatch");
		}
	}
},

	'click .cancel':function(evt, tmpl){
	Session.set('showaddmemform', false);
},

	'click .close':function(evt, tmpl){
	Session.set('showaddmemform', false);
}

})



Template.userdeleteprompt.events({
	'click .del':function(evt, tmpl){

	var uid = Session.get('memberdelform');
	Meteor.call('removeUser',uid);
	alert('User Succesfuly Deleted');
	Session.set('memberdelform', false);
	
},
	'click .cancel':function(evt, tmpl){

	Session.set('memberdelform', false);
},

	'click .close':function(evt, tmpl){
	Session.set('memberdelform', false);
}

})


Template.changepasswordform.events({
	'click .chngepw':function(evt, tmpl){
	
	var uid = Session.get('memberdeldata');
	var pword =  tmpl.find('.newpassword').value;
	var repword =  tmpl.find('.renewpassword').value;
	
	if(pword === '' || repword === '')
	{
		alert('Enter New Password in Both text boxes!!');
		
	}
	else
	{
		if(pword === repword)
		{
			Meteor.call('changeuserpassword',uid,pword);
			alert('Password Changed');
			Session.set('showchangepwform', false);
			
		}
		else
		{
			alert('Password Mismatch');
			$('.newpassword').value(null);
			$('.renewpassword').value(null);
		}
	}
	
	
},
	'click .cancel':function(evt, tmpl){

	Session.set('showchangepwform', false);
},

	'click .close':function(evt, tmpl){
	Session.set('showchangepwform', false);
}

})


Template.membermgtProfile.membersInfo= function(){
	
 	return Members.find({parent:this._id});	  
}

Template.membermgtProfile.getnonmembersInfo= function(){
		
 	return Meteor.users.find({_id:this.parent});	  
}

Template.profileForm.memberUpdate = function(){

	return Session.get('memberdata');
}


