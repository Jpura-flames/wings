Template.post.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Members");
	Meteor.subscribe("Users");
	Meteor.subscribe("Posttexts");
	Meteor.subscribe("Likes");
	})	
}
Session.setDefault('showpostdeleteprompt', false);

Template.postcomment.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Members");
	Meteor.subscribe("Users");
	Meteor.subscribe("Posttexts");
	Meteor.subscribe("Likes");
	})	
}



Template.post.events({
  'keyup .comment': function(evt,tmpl){
 
    if(evt.which === 13){
   
       var posttxt = tmpl.find('.comment').value;
	var options = {text:posttxt, parent:this._id};
	Meteor.call('addPost',options)
	$('.comment').val("").select.focus();	
	
    
    }
 
},

	'click .close2': function(evt,tmpl){
	alert(tmpl.data._id);
	var id = tmpl.data._id;
	Session.set('postData',id);
	Session.set('showpostdeleteprompt',true);

}


});

Template.post.likeCount= function(){
 	var likecount = Likes.find({postid:this._id}).count();

	if(likecount === 1 || likecount === 0)
	{
		var likestatus = likecount + ' Member  Like';		
	}
	else
	{	
		var likestatus = likecount + ' Members Like'; 
	}
	if( likecount === 0)
		likestatus = null;
 	return likestatus;   
}

Template.post.likeUsers= function(){
	var likesdata = Likes.find({postid:this._id});  
 	var memdata = Members.find({parent:likesdata.uid});
 
 	return memdata;   
}

Template.post.checklike= function(){
	var userid = Meteor.userId();
	var checkedlike  = Likes.findOne({postid:this._id , uid:userid});
	return checkedlike;
}

Template.postcomment.likeCount= function(){
 	var likecount = Likes.find({postid:this._id}).count();

	if(likecount === 1 )
	{
		var likestatus = likecount + ' Member  Like';		
	}
	else
	{	
		var likestatus = likecount + ' Members  Like';
	}
	if( likecount === 0)
		likestatus = null;
 	return likestatus;   
}

Template.postcomment.checklike= function(tmpl){

	var checkedlike  = Likes.findOne({postid:this._id, uid:Meteor.userId()});
	
 	if(checkedlike)
 	{
	return 'You like this';  
	}
	else
	{
		return null;
	}    
}

Template.post.CommentTexts= function(){
 
 	return Posttexts.find({parent:this._id});   
}

Template.post.profile = function(){
	
	return Members.findOne({parent:this.owner});
}

Template.post.postData = function(){
	
	return Session.get('postData',id);
}


Template.postcomment.events({  
	'click .commentlikebtn': function(evt,tmpl){
	
	var uid = Meteor.userId();
	var postid = tmpl.data._id;
	var checkedlike  = Likes.findOne({postid:postid, uid:uid});

	if(!checkedlike)
	{	
		Meteor.call('addPostlikes',uid,postid);
	}
	else
	{
		var id =checkedlike._id;
		Meteor.call('removePostlikes',id);
	}
},
 	'click .close1': function(evt,tmpl){
 		alert(this._id);
	var id = tmpl.data._id;
	Session.set('postData',id);
	Session.set('showpostdeleteprompt',true);
}

});

Template.post.events({  
 	'click .likebtn': function(evt,tmpl){
	
	var uid = Meteor.userId();
	var postid = tmpl.data._id;
	var checkedlike  = Likes.findOne({postid:postid , uid:uid});

	if(!checkedlike)
	{	
		Meteor.call('addPostlikes',uid,postid);
	}
	else
	{
		
		var id =checkedlike._id;
		Meteor.call('removePostlikes',id);
	}
}

});
Template.post.showpostdeleteprompt= function(){
		
		return Session.get('showpostdeleteprompt');
}

Template.postdeleteprompt.events({
	'click .del': function(evt,tmpl){
		var id = Session.get('postData');
		Meteor.call('removePost',id);
			alert("Comment Deleted");
			Session.set('showpostdeleteprompt',false);
	},

	'click .close': function(evt,tmpl){
			Session.set('showpostdeleteprompt',false);
	},

	'click .cancel': function(evt,tmpl){
			Session.set('showpostdeleteprompt',false);
	}
})


Template.postcomment.profile = function(){
	
	return Members.findOne({parent:this.owner});
}

