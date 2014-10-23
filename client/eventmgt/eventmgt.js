
	Session.setDefault('appName','Event Manager');
	Session.setDefault('showeventform', false);	

Template.eventmgt.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Events");
		
	})

	
}

Template.eventmgtForm.rendered = function(){
	
	var eve = Events.findOne({_id:Session.get('editing_event_data')})
	$('.status').val(eve.eventstatus);


}

Template.eventmgt.eventList = function(){

	return Events.find();
}


Template.eventmgtForm.events({
	'click .save':function(evt, tmpl){
	
	var eventname = tmpl.find('.eventname').value;
	var eventdatentime = tmpl.find('.datentime').value;
	var venue = tmpl.find('.venue').value;
	var client = tmpl.find('.client').value;
	var contact = tmpl.find('.contact').value;
	var eventcordinator = tmpl.find('.eventcor').value;
	var eventstatus = tmpl.find('.status').value;
	var addeddate = new Date();
	
	
	var userid = Meteor.userId();
	var options = {eventname:eventname,
			eventdatetime:eventdatentime,
			venue:venue,
			client:client,
			contact:contact,
			eventcordinator:eventcordinator,
			eventstatus:eventstatus,
			addeddate:addeddate,
			userid:userid		
			};
	if(Session.get('editing_event_data'))
	{
		var id = Session.get('editing_event_data');
		Meteor.call('updateEvent',options,id);
		alert('Event Successfully Updated');
		Session.set('showeventform',false);
	}
	else{
		Meteor.call('addEvent',options);
	}
	
	Session.set('showeventform',false);
	Session.set('editing_event_data',null);
},
	'click .cancel':function(evt, tmpl){
		Session.set('showeventform',false);
		Session.set('editing_event_data',null);
},
	'click .close':function(evt, tmpl){
	Session.set('showeventform',false);
},	

	'click .delete':function(evt, tmpl){
	var id = Session.get('editing_event_data');
	Meteor.call('removeEvent',id);
	alert('Event Successfully Deleted');
	Session.set('showeventform',false);
}


})


Template.eventmgtinforow.events({
	'click .updateform':function(evt, tmpl){
	
	Session.set('editing_event_data',tmpl.data._id);
	Session.set('showeventform',true);
}

})

Template.eventmgtForm.events = function(){

	return Events.findOne({_id:Session.get('editing_event_data')});
}

Template.eventmgtForm.editing_event_data= function(){
		
	return Session.get('editing_event_data');
}




Template.eventmgt.showeventform = function(){

	return Session.get('showeventform');
}	

Template.eventmgt.events({
	'click .addevenbtn':function(evt, tmpl){
	Session.set('showeventform',true);
	
}	
})

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

