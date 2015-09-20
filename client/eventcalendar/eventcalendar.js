Session.setDefault('lastMod',null);
Session.setDefault('showEditEvent',null);
Session.setDefault('editing_calevent',false);

Template.eventcalendar.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Events");
		
	})


	$('#calendar').fullCalendar({

	dayClick:function(date, allDay, jsEvent, view){

		var event ={
				eventname:'newevent',
				eventdatentimestart:date,
				eventdatentimeend:date,
				venue:'Basha'
		}

		Meteor.call('addEvent',event,function(err, result){
			    	if(!err){
			    		toastr.success('Event Added')
			    	} else {
			    		toastr.error('Event Not Added')
			    	}
			    });
		Session.set('lastMod',new Date());
	},

	eventClick:function(calevent, jsevent, view){

		Session.set('editing_calevent_data',calevent._id);
		alert(Session.get('editing_calevent_data'));
		
			 var shareDialogInfo = {

	    template: Template.eventcalmgtForm,
	    title: 'Update Event',
	    buttons: {
	      "ok": {
	        class: 'btn-info',
	        label: 'Ok'
	      },
	      "del": {
	        class: 'btn-danger',
	        label: 'Delete'
	      },
	      "cancel": {
	        class: 'btn-warning',
	        label: 'Cancel'
	      }
	    }
	  }

		var rd = ReactiveModal.initDialog(shareDialogInfo);
	  

		rd.buttons.ok.on('click', function(button){



		})


	  	rd.show();
	  	Session.set('showeventform', false);	
		Session.set("eventnull",false);
		Session.set("eventdatentimestartnull",false);
		Session.set("venuenull",false);
		Session.set("clientnull",false);
		Session.set("contactnull",false);
		Session.set("eventcordinatornull",false);



	},

	events: function(start, end, callback){
	
		var thisevent =[];

		calEvents = Events.find({}).fetch();


		calEvents.forEach(function (evt){	

			Events ={id:evt._id,title:evt.eventname,start:evt.eventdatentimestart,
					end:evt.eventdatentimeend,venue:evt.venue};

			thisevent.push(Events);

		})

		callback(thisevent);

		}

	});

}

Template.eventcalendar.lastMod = function(){
	return Session.get('lastMod');
}

Template.eventcalmgtForm.editing_calevent_data= function(){
		
	return Session.get('editing_calevent_data');

}
Template.eventcalmgtForm.rendered = function () {

	var calevent= Events.findOne({_id:Session.get('editing_calevent_data')});

	$('#caladdeventname').val(Session.get('editing_calevent_data'));
	$('#caldtpdatentimestart').val(calevent.eventdatentimestart);
	$('#caldtpdatentimeend').val(calevent.eventdatentimeend);
	$('#calvenue').val(calevent.venue);
	$('#calclient').val(calevent.client);
	$('#caleventcontact').val(calevent.contact);
	$('#caleventcor').val(calevent.eventcordinator);
}