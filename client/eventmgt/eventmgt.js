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

	return Events.find({}, {sort: {eventdatetime: 1}});
}


Template.eventmgtForm.events({
	'click .save':function(e, tmpl){

		e.preventDefault();
		 var shareDialogInfo = {
	    template: Template.eventmgtForm,
	    title: "Add Event",
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

	var eventname = $('#eventname').val();
	var eventdatentime = $('#datentime').val();
	var venue = $('#venue').val();
	var client = $('#client').val();
	var contact = $('#contact').val();
	var eventcordinator = $('#eventcor').val();
	var eventstatus = 'future';
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
		var rd = ReactiveModal.initDialog(shareDialogInfo);
	  
	  	rd.buttons.ok.on('click', function(button){

	if(Session.get('editing_event_data'))
	{
		var id = Session.get('editing_event_data');
		Meteor.call('updateEvent',options,id,function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('Event Updated')
			    	} else {
			    		toastr.error('Event Not Updated')
			    	}
	  			});
	}
	else{
			Meteor.call('addEvent',options,function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('Add New Event Successfully')
			    	} else {
			    		toastr.error('Event Not Added')
			    	}
	  			});
		}
	
	
  			 
	 })

	  	rd.show();
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

Template.eventmgtinforow.eventDay = function(){
	var showevent = Events.findOne({_id:this._id});
	var eventdatetime = showevent.eventdatetime.length;

	var eventDay = showevent.eventdatetime.substring(8,10);		
	return eventDay;
}

Template.eventmgtinforow.eventYear = function(){
	var showevent = Events.findOne({_id:this._id});
	var eventdatetime = showevent.eventdatetime.length;

	var eventYear = showevent.eventdatetime.substring(0,4);		
	return eventYear;
}

Template.eventmgtinforow.eventTime = function(){
	var showevent = Events.findOne({_id:this._id});
	var eventdatetime = showevent.eventdatetime.length;

	var eventTime = showevent.eventdatetime.substring(10);		
	return eventTime;
}

Template.eventmgtinforow.eventMonth = function(){
	var showevent = Events.findOne({_id:this._id});
	var eventdatetime = showevent.eventdatetime.length;

	
		var eventMonth = showevent.eventdatetime.substring(5,7);

		
		if(eventMonth === '01')
		{
			var eventMonthstr = 'Jan';
		}
		if(eventMonth === '02')
		{
			var eventMonthstr = 'Feb';
		}
		if(eventMonth === '03')
		{
			var eventMonthstr = 'Mar';
		}
		if(eventMonth === '04')
		{
			var eventMonthstr = 'Apr';
		}
		if(eventMonth === '05')
		{
			var eventMonthstr = 'May';
		}
		if(eventMonth === '06')
		{
			var eventMonthstr = 'June';
		}
		if(eventMonth === '07')
		{
			var eventMonthstr = 'July';
		}
		if(eventMonth === '08')
		{
			var eventMonthstr = 'Aug';
		}
		if(eventMonth === '09')
		{
			var eventMonthstr = 'Sep';
		}
		if(eventMonth === '10')
		{
			var eventMonthstr = 'Oct';
		}
		if(eventMonth === '11')
		{
			var eventMonthstr = 'Nov';
		}
		if(eventMonth === '12')
		{
			var eventMonthstr = 'Dec';
		}


		return eventMonthstr;

	
}
