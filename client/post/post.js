Template.post.rendered = function(){

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

	'click .close': function(evt,tmpl){
	
	var id = tmpl.data._id;
	Meteor.call('removePost',id);
	alert("Post Deleted");


}


});

Template.post.likeCount= function(){
 	var likecount = Likes.find({postid:this._id}).count();

	if(likecount === 1 || likecount === 0)
	{
		var likestatus = likecount + ' Member';		
	}
	else
	{	
		var likestatus = likecount + ' Members';
	}
	if( likecount === 0)
		likestatus = null;
 	return likestatus;   
}

Template.post.checklike= function(){

	var checkedlike  = Likes.findOne({postid:this._id},{uid:Meteor.userId()});
 	if(checkedlike)
	return 'You like this';   
}


Template.postcomment.likeCount= function(){
 	var likecount = Likes.find({postid:this._id}).count();

	if(likecount === 1 || likecount === 0)
	{
		var likestatus = likecount + ' Member';		
	}
	else
	{	
		var likestatus = likecount + ' Members';
	}
	if( likecount === 0)
		likestatus = null;
 	return likestatus;   
}

Template.postcomment.checklike= function(){

	var checkedlike  = Likes.findOne({postid:this._id},{uid:Meteor.userId()});
 	if(checkedlike)
	return 'You like this';   
}




Template.post.CommentTexts= function(){
 
 	return Posttexts.find({parent:this._id});   
}

Template.post.profile = function(){
	
	return Members.findOne({parent:this.owner});
}


Template.postcomment.events({  
	'click .commentlikebtn': function(evt,tmpl){
	
	var uid = Meteor.userId();
	var postid = tmpl.data._id;
	var checkedlike  = Likes.findOne({postid:postid},{uid:uid});

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
 	'click .close': function(evt,tmpl){
	
	var id = tmpl.data._id;
	Meteor.call('removePost',id);
	alert("Comment Deleted");
}

});

Template.post.events({  
 	'click .likebtn': function(evt,tmpl){
	
	var uid = Meteor.userId();
	var postid = tmpl.data._id;
	var checkedlike  = Likes.findOne({postid:postid},{uid:uid});

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



Template.postcomment.profile = function(){
	
	return Members.findOne({parent:this.owner});
}

