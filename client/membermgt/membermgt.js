
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

Template.changepasswordform.userData = function(){

	return Meteor.users.findOne({_id:Session.get('memberdeldata')});
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
	'click #addmember':function(e, tmpl){
		e.preventDefault();
		 var shareDialogInfo = {
	    template: Template.addMemberForm,
	    title: "Add new member",
	    modalDialogClass: "share-modal-dialog", //optional
	    modalBodyClass: "share-modal-body", //optional
	    modalFooterClass: "share-modal-footer",//optional
	    removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
	    buttons: {
	      "ok": {
	        class: 'btn-info',
	        closeModalOnClick: false,
	        label: 'Ok'
	      },
	      "cancel": {
	        class: 'btn-danger',
	        label: 'Cancel'
	      }
	    }
	  }


	  var rd = ReactiveModal.initDialog(shareDialogInfo);
	  rd.buttons.ok.on('click', function(button){
			var uname = $('#uname').val();
			var email = $('#e-mail').val();
			var password = $('#password').val();
			var repassword = $('#password2').val();

			if (!uname|| !email|| !password || !repassword ) {
			  toastr.error('Form Data Cannot be null');
			} else {
			  if (password === repassword) {
			    var profile = {
			      uname: uname,
			      email: email,
			      password: password,
			    };
			    Meteor.call('addUser', profile, function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('created new user successfully')
			    	} else {
			    		
			    	}
			    });

			  } else {
			  	toastr.error('Password Mismatch')
			   
			  }
			}

		});
	  rd.show();

}

})

Template.membermgtProfile.events({

	'click .save':function(e, tmpl){
		
	e.preventDefault();
		 var shareDialogInfo = {
	    template: Template.profileForm,
	    title: "Add Member Information",
	    modalDialogClass: "share-modal-dialog", //optional
	    modalBodyClass: "share-modal-body", //optional
	    modalFooterClass: "share-modal-footer",//optional
	    removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
	    buttons: {
	      "ok": {
	        class: 'btn-info',
	        closeModalOnClick: false,
	        label: 'Ok'
	      },
	      "cancel": {
	        class: 'btn-danger',
	        label: 'Cancel'
	      }
	    }
	  }
	  var userId = this._id;
	  Session.set('memberdata',userId);
		Session.set('showprofform',true);

		 var rd = ReactiveModal.initDialog(shareDialogInfo);
	  		
	  		rd.buttons.ok.on('click', function(button){

	  		  var name = $('#membername').val();
			  var mobile = $('#mobile').val();
			  var twitterid = $('#twitterid').val();
			  var faculty = $('#faculty').val();
			  var adminrole = $('#adminroles').val();
			  var addeddate = new Date();
		  

        var photo = $('#pg').is(':checked');
        var aw = $('#aw').is(':checked');
        var it = $('#it').is(':checked');
        var hr = $('#hr').is(':checked');
        var mkt = $('#mkt').is(':checked');
        var fin = $('#fin').is(':checked');

			  var profile = {
			  	name:name,
		      	mobile:mobile,
		      	twitterid:twitterid,
		      	faculty:faculty,
		      	job:{
		      	photo: photo,
		      	aw : aw, it :it,
		      	hr:hr, mkt:mkt,
		      	fin:fin
		     	},
		      adminrole:adminrole,
		      addeddate:addeddate,
		      parent:userId 
			  };
			   Meteor.call('updateProfile',profile,function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('User Information Added successfully')
			    	} else {
			    		toastr.error('User Information Not Added')
			    		
			    	}
			    });
			    Session.set('showaddmemform', false);
		});
	  rd.show();
},

	'click .update':function(evt, tmpl){
		Session.set('memberdata',tmpl.data._id);
		Session.set('showprofform',true);
},

	'click .chngpw':function(e, tmpl){
				
		var userId = this._id;
		e.preventDefault();
		 var shareDialogInfo = {
	    template: Template.changepasswordform,
	    title: "Change Password",
	    modalDialogClass: "share-modal-dialog", //optional
	    modalBodyClass: "share-modal-body", //optional
	    modalFooterClass: "share-modal-footer",//optional
	    removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
	    buttons: {
	      "ok": {
	        class: 'btn-info',
	        closeModalOnClick: false,
	        label: 'Ok'
	      },
	      "cancel": {
	        class: 'btn-danger',
	        label: 'Cancel'
	      }
	    }
	  };


	  
	  var rd = ReactiveModal.initDialog(shareDialogInfo);
	  
	  	rd.buttons.ok.on('click', function(button){

			  var password = $('#changepassword').val();
		   	var password2 = $('#changepassword2').val();

	  			 Meteor.call('changeuserpassword',userId, password,function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('Password Changed Successfully')
			    	} else {
			    		toastr.error('Password Not Changed')
			    	}
	  	})

	  			 
	  })

	  	rd.show();


		Session.set('showchangepwform',true);
},
	'click .close':function(e, tmpl){
		Session.set('memberdelform',tmpl.data._id);

			e.preventDefault();
		 var shareDialogInfo = {
	    template: Template.userdeleteprompt,
	    title: "Remove Member",
	    modalDialogClass: "share-modal-dialog", //optional
	    modalBodyClass: "share-modal-body", //optional
	    modalFooterClass: "share-modal-footer",//optional
	    removeOnHide: true, //optional. If this is true, modal will be removed from DOM upon hiding
	    buttons: {
	      "ok": {
	        class: 'btn-info',
	        closeModalOnClick: false,
	        label: 'Ok'
	      },
	      "cancel": {
	        class: 'btn-danger',
	        label: 'Cancel'
	      }
	    }
	  };

	  var rd = ReactiveModal.initDialog(shareDialogInfo);

	  	rd.buttons.ok.on('click', function(button){

	  			 Meteor.call('removeUser',Session.get('memberdelform'),function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('Member Deleted successfully')
			    	} else {
			    		toastr.error('Member Not Deleted')
			    		
			    	}
	  	})

	  			 
	  })

	  	rd.show();		
	
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
		
},
	'click .update': function(evt, tmpl){
	
	// var name = tmpl.find('.name').value;
	// var mobile = tmpl.find('.mobile').value;
	// var twitterid = tmpl.find('.twitterid').value;
	// var faculty = tmpl.find('.faculty').value;
	// var addeddate = new Date();
	// var parent = Session.get('memberdata');
	// var adminrole = tmpl.find('.adminroles').value;
	// var profile = Members.findOne({parent:Session.get('memberdata')});
	// var id = profile._id;

	// var photo = tmpl.find('.pg').checked;
	// var aw = tmpl.find('.aw').checked;
	// var it = tmpl.find('.it').checked;
	// var hr = tmpl.find('.hr').checked;
	// var mkt = tmpl.find('.mkt').checked;
	// var fin = tmpl.find('.fin').checked;
	
	// var profile = { id:id,
	// 		name:name,
	// 		mobile:mobile,
	// 		twitterid:twitterid,
	// 		faculty:faculty,
	// 		job:{photo: photo,
	// 		aw : aw, it :it,
	// 		hr:hr, mkt:mkt,
	// 		fin:fin},
	// 		adminrole:adminrole,
	// 		parent:	parent
	// 		};


	// 	Session.set('showprofform', false);
		
		
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
	mem  = mem || {}
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
	var uname = tmpl.find('.uname').value;
	var pword =  tmpl.find('.newpassword').value;
	var repword =  tmpl.find('.renewpassword').value;
	if(uname === '')
	{
		alert('Username cannon be null!!');

	}

		else
		{

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
			//Meteor.call('changeusername',uid,uname);


			var profile = {
								username:uname
							};
						
			Meteor.users.update(uid, {username:uname});
			alert('Username Changed!!');
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


