if(Meteor.isClient){
	Session.setDefault('appName','Event Manager');
	Session.setDefault('showeventform', false);	

Template.eventpage.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Events");
		
	})
}

Template.eventpage.eventList = function(){
	return Events.find({},{sort: {eventdatentimestart: -1}});
}

Template.coveredeventpage.eventList = function(){
	return Events.find({}, {sort: {eventdatentimestart: 1}});
}


Template.eventinforow.events({
	'dblclick .eventinforow':function(evt, tmpl){
	
	Session.set('editing_event_data',tmpl.data._id);
	Session.set('showeventform',true);
	
	
}

})

Template.eventForm.events({
	'click .view':function(evt, tmpl){
	
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



Template.eventForm.latestevents = function(){
	return Events.findOne({_id:Session.get('editing_event_data')});
}

Template.eventinforow.eventdate = function(){
	var levent= Events.findOne({_id:this.data._id});
	var date = levent.eventdatetime;
	return date;	
}

Template.eventForm.editing_event_data= function(){
		
		return Session.get('editing_event_data');
}

Template.eventpage.events({
	'click .addevenbtn':function(evt, tmpl){
	Session.set('showeventform',true);
	
}	
})


Handlebars.registerHelper("formatDate",function(datetime){

	if(moment){
		return moment(datetime).format("MM/DD/YYYY");
	}
	else
	{
	return datetime;	
	}
});

}
