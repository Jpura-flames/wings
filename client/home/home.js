Template.home.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Posttexts",Meteor.userId());
	Meteor.subscribe("likes");
	})
}

Template.home.Posttexts= function(){
 
 return Posttexts.find({parent:null},{sort:{date:-1}});   
}

Template.home.events({
  'keyup .posttexts': function(evt,tmpl){
 
    if(evt.which === 13){
   
       var posttxt = tmpl.find('.posttexts').value;
	var options = {text:posttxt, parent:null};
	Meteor.call('addPost',options)
	$('.posttexts').val("").select.focus();	
	
    
    }
 
}
});



Template.home.likeCount= function(){

 return Likes.find(this._id).count();   
}
