if(Meteor.isClient){
	Session.setDefault('appName','Event Manager');
	Session.setDefault('showdutieform', false);	
	Session.setDefault('dutiedelete', false);

Template.dutiesmgt.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Events");
	Meteor.subscribe("Members");
	Meteor.subscribe("Duties");	
	})
}

Template.dutiesmgtForm.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Events");
	Meteor.subscribe("Members");	
	})

	var dutie = Duties.findOne({_id:Session.get('updateDutie')});
	//alert(dutie.dutiename);
	$('.dutietype').val(dutie.dutiename);
	$('.dutiestatus').val(dutie.dutiestatus);
	$('.member').val(dutie.member);

	
}

Template.dutiesmgtinforow.job= function(){
		
		return Session.get('job');
}

Template.dutiesmgtForm.job= function(){
		
		return Session.get('job');
}

Template.dutiesmgt.dutiedelete= function(){
		
		return Session.get('dutiedelete');
}

Template.dutiesmgtForm.mem = function(){

		return Members.find();
}


Template.dutiesmgtForm.assignType= function(){

	var assigndutie
	if(Session.get('job')==='pg')
	{
		assigndutie ='Assign Photographer';
		return assigndutie;
		
	}
	if(Session.get('job')==='aw')
	{
		assigndutie ='Assign Aritcle Writer';
		return assigndutie;
	}
	if(Session.get('job')==='coordi')
	{
		assigndutie ='Assign Coordinator';
		return assigndutie;
	}
	if(Session.get('job')==='gd')
	{
		assigndutie ='Assign Graphic Designer';
		return assigndutie;
	}
	if(Session.get('job')=== null)
	{
		assigndutie ='Add Dutie';
		return assigndutie;
	}
}


Template.assigndutiesmgt.dutieMem = function(){

	return Members.findOne({parent:this.member});
}


Template.dutiesmgt.eventList = function(){

	return Events.find();
}

Template.dutiesmgtinforow.eventDutie = function(){

	return Duties.find({event:this.eventname});
}


Template.dutiedeleteprompt.events({

	'click .del':function(evt, tmpl){
	var id = Session.get('dutiedeleteid');
	Meteor.call('deleteDutie',id);	
	alert('Dutie Successfully Updated');

	Session.set('dutiedelete', false);

},

	'click .cancel':function(evt, tmpl){

	Session.set('dutiedelete', false);

},
	
	'click .close':function(evt, tmpl){

	Session.set('dutiedelete', false);

}

})

Template.dutiesmgtForm.events({

	'click .save':function(evt, tmpl){
	
	var dutiename;

	if(Session.get('job')==='pg')
	{
		dutiename ='Photographer';
	}
	if(Session.get('job')==='aw')
	{
		dutiename ='Aritcle Writer';
	}
	if(Session.get('job')==='coordi')
	{
		dutiename ='Coordinator';

	}
	if(Session.get('job')==='gd')
	{
		dutiename ='Graphic Designer';
	
	}
	if(Session.get('job')=== null)
	{
		dutiename = tmpl.find('.dutietype').value;
	}

	
	var dutiedesc = tmpl.find('.dutiedesc').value;
	var event = tmpl.find('.eventname').value;
	var datetime = tmpl.find('.datentime').value;
	var member = tmpl.find('.member').value;
	var dutiestatus = tmpl.find('.dutiestatus').value;
	var addeddate = new Date();
	
	var userid = Meteor.userId();
	var options = {dutiename:dutiename,
			dutiedesc:dutiedesc,
			event:event,
			datetime:datetime,
			member:member,
			dutiestatus:dutiestatus,
			addeddate:addeddate
			};
	
		Meteor.call('addDutie',options);
		alert('Dutie Successfully Added');
		Session.set('showdutieform',false);
		Session.set('editing_dutie_data',null);
		Session.set('job',null);
},

	'click .cancel':function(evt, tmpl){
		
		Session.set('showdutieform',false);
		Session.set('editing_dutie_data',null);
		Session.set('job',null);
		Session.set('updateDutie',null);
},
	'click .close':function(evt, tmpl){
	
	Session.set('showdutieform',false);
	Session.set('editing_dutie_data',null);
	Session.set('job',null);
	Session.set('updateDutie',null);
},	


	'click .update':function(evt, tmpl){
	var id = Session.get('updateDutie');
	var dutiename = tmpl.find('.dutietype').value;
	var dutiedesc = tmpl.find('.dutiedesc').value;
	var event = tmpl.find('.eventname').value;
	var datetime = tmpl.find('.datentime').value;
	var member = tmpl.find('.member').value;
	var dutiestatus = tmpl.find('.dutiestatus').value;
	var addeddate = new Date();

	var options = {dutiename:dutiename,
			dutiedesc:dutiedesc,
			event:event,
			datetime:datetime,
			member:member,
			dutiestatus:dutiestatus,
			addeddate:addeddate
			};

	Meteor.call('updateDutie',options,id);
		alert('Dutie Successfully Updated');
		Session.set('showdutieform',false);
		Session.set('editing_dutie_data',null);
		Session.set('job',null);
		Session.set('updateDutie',null);
}

	

})




Template.dutiesmgtinforow.events({
	'dblclick .dutieinforow':function(evt, tmpl){
	Session.set('editing_dutie_data',tmpl.data._id);
	Session.set('showdutieform',true);
},
	'click .photo':function(evt, tmpl){
	Session.set('editing_dutie_data',tmpl.data._id);
	Session.set('job','pg');
	Session.set('showdutieform',true);
},

	'click .aw':function(evt, tmpl){
	Session.set('editing_dutie_data',tmpl.data._id);
	Session.set('job','aw');
	Session.set('showdutieform',true);
},

	'click .gd':function(evt, tmpl){
	Session.set('editing_dutie_data',tmpl.data._id);
	Session.set('job','gd');
	Session.set('showdutieform',true);
},

	'click .cordi':function(evt, tmpl){
	Session.set('editing_dutie_data',tmpl.data._id);
	Session.set('job','coordi');	
	Session.set('showdutieform',true);
}

})

Template.dutiesmgtForm.events = function(){

	return Events.findOne({_id:Session.get('editing_dutie_data')});
}

Template.assigndutiesmgt.events({

	'click .update':function(evt, tmpl){
	Session.set('showdutieform',true);
	Session.set('updateDutie',tmpl.data._id);
},	

	'click .delete':function(evt, tmpl){
	Session.set('dutiedelete', true);
	var id = tmpl.data._id;
	Session.set('dutiedeleteid', tmpl.data._id);
	
	
}	

})



Template.dutiesmgtForm.updateDutie= function(){
		
		return Session.get('updateDutie');
}

Template.dutiedeleteprompt.dutiedeleteid= function(){
		
		return Session.get('dutiedeleteid');
}


Template.dutiesmgtForm.editing_dutie_data= function(){
		
	return Session.get('editing_dutie_data');
}


Template.dutiesmgt.showdutieform = function(){

	return Session.get('showdutieform');
}	


Template.dutiesmgt.events({
	'click .adddutiebtn':function(evt, tmpl){
	Session.set('showdutieform',true);
	
}	
})

Template.dutiesmgtForm.updateDutieinfo = function(){

	return Duties.findOne({_id:Session.get('updateDutie')});
}

var updateEvent = function(options){
	
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
			
	Meteor.call('updateProject',event);
				
			return true;
}

}
