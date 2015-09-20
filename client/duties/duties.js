if(Meteor.isClient){
	Session.setDefault('appName','Event Manager');
	Session.setDefault('showeventform', false);	
	Session.setDefault('dutiid', false);	
Template.duties.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Duties");
	Meteor.subscribe("Members");
	Meteor.subscribe("Events");	
	})	
}


Template.duties.chekdutieStat = function(){

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

Template.duties.confirmation = function(){

		return Session.get('confirmation');
	}

Template.duties.dutieList = function(){

	return Duties.find();
}

Template.coveredduties.dutieList2 = function(){

	return Duties.find();
}

Template.duties.memberData = function(){

	var mem = Duties.findOne({_id:this._id});
	var memid= mem.member;
	var showmember = Members.findOne({parent:memid});
	
	return showmember; 
}

Template.duties.adminData = function(){

	var duti = Duties.findOne({_id:this._id});
	var eventId= duti.event;
	var showevent = Events.findOne({_id:eventId});
	
	return showevent; 
}
Template.duties.dutieEvent = function(){

	var duti = Duties.findOne({_id:this._id});
	var eventId= duti.event;
	var showevent = Events.findOne({_id:eventId});
	
	return showevent; 
}
Template.duties.events({  
	'click .close': function(evt,tmpl){
		Meteor.call('deleteDutie',tmpl.data._id);
	},

	'click .confirm': function(evt,tmpl){

		Session.set('dutiid', this._id);	

		 var shareDialogInfo = {

	    template: Template.dutieconfirmationdialog,
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

	  rd4 = ReactiveModal.initDialog(shareDialogInfo);
	  rd4.buttons.yes.on('click', function(button){

		var dutieid = Session.get('dutiid');
	  	var duti = Duties.findOne({_id:dutieid});
		var dutiestat = 'doing';
		var updatedutie ={dutiename:duti.dutiename,
		dutiedesc:duti.dutiedesc,
		event:duti.event,
		datetime:duti.datetime,
		member:duti.member,
		dutiestatus:dutiestat,
		addeddate:duti.addeddate
		};
		

			Meteor.call('updateDutie2',dutieid, updatedutie, function(err, result){
				if(!err){
					toastr.success('Dutie Confirmed')
				} else {
					toastr.error('Dutie Not Confirmed')
				}

			});
		});

	  rd4.buttons.no.on('click', function(button){
 	
	  	var dutieid = Session.get('dutiid');
	  	var duti = Duties.findOne({_id:dutieid});
		var dutiestatus = 'not doing';
		var updatedutie ={dutiename:duti.dutiename,
			dutiedesc:duti.dutiedesc,
			event:duti.event,
			datetime:duti.datetime,
			member:duti.member,
			dutiestatus:dutiestatus,
			addeddate:duti.addeddate
		};

			Meteor.call('updateDutie2',dutieid, updatedutie, function(err, result){
				if(!err){
					toastr.warning('Dutie Reject')
				} else {
					toastr.success('Dutie Not Rejected')
				}

			});
		});

		rd4.show();	
		
	},

	'click .del': function(evt,tmpl){
	Session.set('dutiid', this._id);	

		 var shareDialogInfo = {

	    template: Template.dutiedeldialog,
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

	  rd5 = ReactiveModal.initDialog(shareDialogInfo);
	  rd5.buttons.yes.on('click', function(button){

		var dutieid = Session.get('dutiid');
	  	
		
			Meteor.call('deleteDutie',dutieid, function(err, result){
				if(!err){
					toastr.success('Dutie Deleted')
				} else {
					toastr.error('Dutie Not Deleted')
				}

			});
		});

	  rd5.buttons.no.on('click', function(button){
 	
	  		rd5.hide();
			});

		rd5.show();
}

})

}