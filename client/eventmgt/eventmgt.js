Session.setDefault('showeventform', false);	
Session.setDefault("eventnull",false);
Session.setDefault("eventdatentimestartnull",false);
Session.setDefault("venuenull",false);
Session.setDefault("clientnull",false);
Session.setDefault("contactnull",false);
Session.setDefault("eventcordinatornull",false);
	

Template.eventmgt.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Events");
		
	})
}


Template.eventmgtForm.rendered = function () {

	var eventInfo = Events.findOne({_id:Session.get('editing_event_data')});
	$('#dtpdatentimestart').val(eventInfo.eventdatentimestart);
	$('#dtpdatentimeend').val(eventInfo.eventdatentimeend);
	$('#addeventname').val(eventInfo.eventname);
	$('#venue').val(eventInfo.venue);
	$('#client').val(eventInfo.client);
	$('#eventcontact').val(eventInfo.contact);
	$('#eventcor').val(eventInfo.eventcordinator);

	Session.set('showeventform', false);	
	Session.set("eventnull",false);
	Session.set("eventdatentimestartnull",false);
	Session.set("venuenull",false);
	Session.set("clientnull",false);
	Session.set("contactnull",false);
	Session.set("eventcordinatornull",false);

}

Template.eventmgt.eventList = function(){

	return Events.find({}, {sort: {eventdatentimestart: -1}});
}

Template.coveredeventpagemgt.eventList = function(){

	return Events.find({}, {sort: {eventdatentimestart: -1}});
}




Template.eventmgtForm.editing_event_data= function(){
		
	return Session.get('editing_event_data');
}
Template.eventmgtForm.eventnull= function(){
		
	return Session.get('eventnull');
}

Template.eventmgtForm.eventdatentimestartnull= function(){
		
	return Session.get('eventdatentimestartnull');
}
Template.eventmgtForm.venuenull= function(){
		
	return Session.get('venuenull');
}
Template.eventmgtForm.clientnull= function(){
		
	return Session.get('clientnull');
}
Template.eventmgtForm.contactnull= function(){
		
	return Session.get('contactnull');
}
Template.eventmgtForm.eventcordinatornull= function(){
		
	return Session.get('eventcordinatornull');
}



Template.eventmgt.showeventform = function(){

	return Session.get('showeventform');
}	

Template.eventmgt.events({
	'click .addevenbtn':function(e, tmpl){
		var id = this._id;
		var title;
		if(id)
		{
			title="Update Event";
			btntype ='btn-warning';
		}
		else
		{
			title="Add Event";
			btntype ='hide';
		}


		Session.set('editing_event_data', this._id);
		e.preventDefault();
		 var shareDialogInfo = {
	    template: Template.eventmgtForm,
	    title: title,
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
	      "del": { 
	        class: btntype,
	        closeModalOnClick: false,
	        label: 'Delete'
	      },
	      "cancel": {
	        class: 'btn-danger',
	        label: 'Cancel'
	      }
	    }
	  };

		var rd = ReactiveModal.initDialog(shareDialogInfo);
	  
	  	rd.buttons.ok.on('click', function(button){
		var eventname = $('#addeventname').val();
		var eventdatentimestart = $('#dtpdatentimestart').val();
		var eventdatentimeend = $('#dtpdatentimeend').val();
		var venue = $('#venue').val();
		var client = $('#client').val();
		var contact = $('#eventcontact').val();
		var eventcordinator = $('#eventcor').val();
		var eventstatus = 'future';
		var addeddate = new Date();
		
	
	if(eventname==='')
	{
		Session.set("eventnull",true);

		if(eventdatentimestart ==='')
		{
			Session.set("eventdatentimestartnull",true);
		
			if(venue==='')
			{
				Session.set("venuenull",true);
				
				if(client==='')
				{
					Session.set("clientnull",true);
					

					if(contact==='')
					{
						Session.set("contactnull",true);
						

						if(eventcordinator==='')
						{
							Session.set("eventcordinatornull",true);
							
						}
						
					}
					
				}
				
			}
				
		}
	}	


	if(eventname==='')
		return;
	
	if(eventdatentimestart ==='')
		return;

	if(venue==='')
		return;

	if(client==='')
		return;

	if(contact==='')
		return;

	if(eventcordinator==='')
		return;

	
			
	var userid = Meteor.userId();
	var eventdata = {eventname:eventname,
			eventdatentimestart:eventdatentimestart,
			eventdatetimeend:eventdatentimeend,
			venue:venue,
			client:client,
			contact:contact,
			eventcordinator:eventcordinator,
			eventstatus:eventstatus,
			addeddate:addeddate,
			userid:userid		
			};
			//console.log(eventdata)

	if(id)
	{
		Meteor.call('updateEvent',eventdata,id,function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('Event Updated')
			    	} else {
			    		toastr.error('Event Not Updated')
			    	}
	  			});
	}
	else{
			Meteor.call('addEvent',eventdata,function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('New Event Added ')
			    	} else {
			    		toastr.error('Event Not Added')
			    	}
	  			});
		}
	
	
  			 
	 })

	rd.buttons.cancel.on('click', function(button){
		Session.set("eventnull",false);
		rd.hide();
	})

	rd.buttons.del.on('click', function(button){
		Meteor.call('removeEvent',id,function(err, result){

			    	if(!err){			    		
			    		rd.hide();
			    		toastr.success('Event Deleted')
			    	} else {
			    		toastr.error('Event Not Deleted')
			    	}
	  			});
	})

	  	rd.show();
	  	Session.set('showeventform', false);	
		Session.set("eventnull",false);
		Session.set("eventdatentimestartnull",false);
		Session.set("venuenull",false);
		Session.set("clientnull",false);
		Session.set("contactnull",false);
		Session.set("eventcordinatornull",false);
}	
})

/********coveredeventpagemgt********/

Template.coveredeventpagemgt.events({

	'click .view1':function(e, tmpl){

		var id = this._id;
		var title;
		if(id)
		{
			title="Update Event";
			btntype ='btn-warning';
		}
		else
		{
			title="Add Event";
			btntype ='hide';
		}


		Session.set('editing_event_data', this._id);
		e.preventDefault();
		 var shareDialogInfo = {
	    template: Template.eventmgtForm,
	    title: title,
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
		var eventname = $('#addeventname').val();
		var eventdatentimestart = $('#dtpdatentimestart').val();
		var eventdatentimeend = $('#dtpdatentimeend').val();
		var venue = $('#venue').val();
		var client = $('#client').val();
		var contact = $('#eventcontact').val();
		var eventcordinator = $('#eventcor').val();
		var eventstatus = 'future';
		var addeddate = new Date();
		
	
	if(eventname==='')
	{
		Session.set("eventnull","Enter Event Name");

		if(eventdatentimestart ==='')
		{
			Session.set("eventdatentimestartnull","Enter Event Datetime");
		
			if(venue==='')
			{
				Session.set("venuenull","Enter Event Venue");
				
				if(client==='')
				{
					Session.set("clientnull","Enter Client Name");
					

					if(contact==='')
					{
						Session.set("contactnull","Enter Contact");
						

						if(eventcordinator==='')
						{
							Session.set("eventcordinatornull","Enter Event Cordinator");
							
						}
						
					}
					
				}
				
			}
				
		}
	}	


	if(eventname==='')
		return;
	
	if(eventdatentimestart ==='')
		return;

	if(venue==='')
		return;

	if(client==='')
		return;

	if(contact==='')
		return;

	if(eventcordinator==='')
		return;

	
			
	var userid = Meteor.userId();
	var eventdata = {eventname:eventname,
			eventdatentimestart:eventdatentimestart,
			eventdatetimeend:eventdatentimeend,
			venue:venue,
			client:client,
			contact:contact,
			eventcordinator:eventcordinator,
			eventstatus:eventstatus,
			addeddate:addeddate,
			userid:userid		
			};
			//console.log(eventdata)

	if(id)
	{
		Meteor.call('updateEvent',eventdata,id,function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('Event Updated')
			    	} else {
			    		toastr.error('Event Not Updated')
			    	}
	  			});
	}
	else{
			Meteor.call('addEvent',eventdata,function(err, result){
			    	if(!err){
			    		rd.hide();
			    		toastr.success('New Event Added ')
			    	} else {
			    		toastr.error('Event Not Added')
			    	}
	  			});
		}
	
	
  			 
	 })

	rd.buttons.cancel.on('click', function(button){
		Session.set("eventnull",false);
		rd.hide();
	})


	  	rd.show();
	  	Session.set('showeventform', false);	
		Session.set("eventnull",false);
		Session.set("eventdatentimestartnull",false);
		Session.set("venuenull",false);
		Session.set("clientnull",false);
		Session.set("contactnull",false);
		Session.set("eventcordinatornull",false);
}	
})


