if(Meteor.isClient){
	Session.setDefault('appName','Event Manager');
	Session.setDefault('showeventform', false);	
	Session.setDefault('confirmation', false);	
Template.duties.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Duties");
	Meteor.subscribe("Members");
	Meteor.subscribe("Events");	
	})	
}


Template.dutiesinforow.chekdutieStat = function(){

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

Template.dutiesinforow.memberData = function(){

	var mem = Duties.findOne({_id:this._id});
	var memid= mem.member;
	var showmember = Members.findOne({parent:memid});
	
	return showmember; 
}

Template.dutiesinforow.adminData = function(){

	var duti = Duties.findOne({_id:this._id});
	var eventId= duti.event;
	var showevent = Events.findOne({_id:eventId});
	
	return showevent; 
}
Template.dutiesinforow.dutieEvent = function(){

	var duti = Duties.findOne({_id:this._id});
	var eventId= duti.event;
	var showevent = Events.findOne({_id:eventId});
	
	return showevent; 
}
Template.dutiesinforow.events({  
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

		Session.set('confirmation',true);
		Session.set('dutiedata',tmpl.data._id);
}

})

Template.confirmationdialog.events({  
	'click .close': function(evt,tmpl){
		Session.set('confirmation',false);
},

	'click .confirm': function(evt,tmpl){

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
		
		Meteor.call('updateDutie2',Session.get('dutiedata'),updatedutie);
		Session.set('confirmation',false);
	},

	'click .reject': function(evt,tmpl){
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

		Meteor.call('updateDutie2',Session.get('dutiedata'),updatedutie);
		Session.set('confirmation',false);
	}
})

}