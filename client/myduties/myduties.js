if(Meteor.isClient){
	Session.setDefault('appName','Event Manager');
	Session.setDefault('showeventform', false);	
	Session.setDefault('confirmation', false);	

Template.myduties.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Duties");
	Meteor.subscribe("Members");
	Meteor.subscribe("Events");
		
	})	
}


Template.mydutiesinforow.rendered = function(){

	var memberdata = Members.findOne({parent:this.data.member});
}

Template.mydutiesinforow.memberData = function(){
	return Members.findOne({parent:this.data.member});
}



Template.myduties.dutieList = function(){

	var memberdata = Members.findOne({parent:Meteor.userId()});
	return Duties.find({member:Meteor.userId()});
}




Template.mydutiesinforow.chekdutieStat = function(){

	var dutie = Duties.findOne({_id:this._id});
		if(dutie.dutiestatus === null)
		{
			var dutiestatus = 'not decided';
		}
		else
		{
			var dutiestatus = null;
			
		}
		return dutiestatus;
}

Template.myduties.confirmation = function(){

		return Session.get('confirmation');
	}

Template.mydutiesinforow.memberData = function(){

	var mem = Duties.findOne({_id:this._id});
	var memid= mem.member;
	var showmember = Members.findOne({parent:memid});
	
	return showmember; 
}

Template.mydutiesinforow.adminData = function(){

	var duti = Duties.findOne({_id:this._id});
	var eventId= duti.event;
	var showevent = Events.findOne({_id:eventId});
	
	return showevent; 
}
Template.mydutiesinforow.dutieEvent = function(){

	var duti = Duties.findOne({_id:this._id});
	var eventId= duti.event;
	var showevent = Events.findOne({_id:eventId});
	
	return showevent; 
}
Template.mydutiesinforow.events({  
	'click .close': function(evt,tmpl){
		Meteor.call('deleteDutie',tmpl.data._id);
	},

	'click .confirm': function(evt,tmpl){

		var duti = Duties.findOne({_id:tmpl.data._id});
		var dutiestat = 'doing';
		var updatedutie ={dutiename:duti.dutiename,
			dutiedesc:duti.dutiedesc,
			event:duti.event,
			datetime:duti.datetime,
			member:duti.member,
			dutiestatus:dutiestat,
			addeddate:duti.addeddate
		};
		
		Meteor.call('updateDutie2',tmpl.data._id,updatedutie);
		
	},

	'click .reject': function(evt,tmpl){
		var duti = Duties.findOne({_id:tmpl.data._id});
		var dutieStatus = 'not doing';
		var updatedutie ={dutiename:duti.dutiename,
			dutiedesc:duti.dutiedesc,
			event:duti.event,
			datetime:duti.datetime,
			member:duti.member,
			dutiestatus:dutieStatus,
			addeddate:duti.addeddate
		};

		Meteor.call('updateDutie2',tmpl.data._id,updatedutie);
		
	},

	'click .edit': function(evt,tmpl){

		rd3.show();
		Session.set('dutiedata',tmpl.data._id);
}

})

Meteor.startup(function(){
	  var shareDialogInfo = {

	    template: Template.mydutieconfirmationdialog,
	    title: "Dutie Confirmation",
	    buttons: {
	      "yes": {
	        class: 'btn-success',
	        label: 'Yes'
	      },
	      "no": {
	        class: 'btn-danger',
	        label: 'No'
	      }
	    }
	  }
	  rd3 = ReactiveModal.initDialog(shareDialogInfo);
	  rd3.buttons.yes.on('click', function(button){

	  		var duti = Duties.findOne({_id:Session.get('dutiedata')});
		var dutiestat = 'doing';
		var updatedutie ={dutiename:duti.dutiename,
			dutiedesc:duti.dutiedesc,
			event:duti.event,
			datetime:duti.datetime,
			member:duti.member,
			dutiestatus:dutiestat,
			addeddate:duti.addeddate
		};
		

			Meteor.call('updateDutie2',Session.get('dutiedata'), updatedutie, function(err, result){
				if(!err){
					toastr.success('Dutie Confirmed')
				} else {
					toastr.error('Dutie Not Confirmed')
				}

			});
		});

	  rd3.buttons.no.on('click', function(button){
	  	var dutieid = Session.get('dutiedata');
	  	var duti = Duties.findOne({_id:Session.get('dutiedata')});
		var dutieStatus = 'not doing';
		var updatedutie ={dutiename:duti.dutiename,
			dutiedesc:duti.dutiedesc,
			event:duti.event,
			datetime:duti.datetime,
			member:duti.member,
			dutiestatus:dutieStatus,
			addeddate:duti.addeddate
		};

			Meteor.call('updateDutie2',dutieid, updatedutie, function(err, result){
				if(!err){
					toastr.warning('Dutie Reject')
				} else {
					toastr.success('Dutie Confirmed')
				}

			});
		});
	  
	});
}