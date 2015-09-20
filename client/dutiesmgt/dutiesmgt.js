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
	Meteor.subscribe("Duties");		
	})
	var dutietype = Session.get('assignType');

	//alert(dutietype);
	$('#dutietype').val(dutietype);

	var dutie = Duties.findOne({_id:Session.get('updateDutie')});
	if(dutie){
		$('#dutietype').val(dutie.dutiename);
		$('#dutiestatus').val(dutie.dutiestatus);
		
		$('#member').val();	
	}

}

Template.dutiesmgtinforow.job2= function(){
		
		return Session.get('job2');
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
		return 'Assign Photographer';
	}
	if(Session.get('job')==='aw')
	{
		return 'Assign Aritcle Writer';
	}
	if(Session.get('job')==='coordi')
	{
		return 'Assign Coordinator';
	}
	if(Session.get('job')==='gd')
	{
		return 'Assign Graphic Designer';
	}
	if(Session.get('job')=== null)
	{
		return 'Add Dutie';
	}
}


Template.assigndutiesmgt.dutieMem = function(){

	return Members.findOne({parent:this.member});
}


Template.dutiesmgt.eventList = function(){

	return Events.find({}, {sort: {eventdatetime: -1}});
}

Template.dutiesmgtinforow.eventDutie = function(){

	return Duties.find({event:this._id});
}

Template.assigndutiesmgt.checkdutiestat = function(){

	var dutie = Duties.findOne({_id:this._id});
		if(dutie.dutiestatus === null)
		{
			var dutiestatus = null;
		}
		else
		{
			var dutiestatus = dutie.dutiestatus;
		}
		return dutiestatus;
}

Template.assigndutiesmgt.showdutiestat = function(){

	var dutie = Duties.findOne({_id:this._id});
		if(dutie.dutiestatus === 'doing')
		{
			var dutiestatus = dutie.dutiestatus;
		}
		else
		{
			var dutiestatus = null;
			
		}
		return dutiestatus;
}

Template.assigndutiesmgt.showdutiestatus = function(){

	var dutie = Duties.findOne({_id:this._id});
		
		return dutie.dutiestatus;
}
// Template.dutiedeleteprompt.events({

// 	'click .del':function(evt, tmpl){
// 	var id = Session.get('dutiedeleteid');
// 	Meteor.call('deleteDutie',id);	
// 	alert('Dutie Successfully Updated');

// 	Session.set('dutiedelete', false);

// },

// 	'click .cancel':function(evt, tmpl){

// 	Session.set('dutiedelete', false);

// },
	
// 	'click .close':function(evt, tmpl){

// 	Session.set('dutiedelete', false);

// }

// })

Template.dutiesmgtForm.events({

	'click .save':function(evt, tmpl){

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
	var member = tmpl.find('#member').value;
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

	

});

Template.dutiesmgtinforow.events({
	'dblclick .dutieinforow':function(evt, tmpl){
	Session.set('editing_dutie_data',this._id);
	Session.set('showdutieform',true);
	rd.show();

},
	'click .photo':function(evt, tmpl){
	Session.set('editing_dutie_data',this._id);
	Session.set('job','pg');
	Session.set('showdutieform',true);
	rd.show();
},

	'click .aw':function(evt, tmpl){
		
	Session.set('editing_dutie_data',this._id);
	Session.set('job','aw');
	Session.set('showdutieform',true);
	rd.show();
},

	'click .gd':function(evt, tmpl){
	Session.set('editing_dutie_data',this._id);
	Session.set('job','gd');
	Session.set('showdutieform',true);
	rd.show();
},

	'click .cordi':function(evt, tmpl){
	Session.set('editing_dutie_data',this._id);
	Session.set('job','coordi');	
	Session.set('showdutieform',true);
	rd.show();
}

})

Template.dutiesmgtForm.events = function(){

	return Events.findOne({_id:Session.get('editing_dutie_data')});
}

Template.assigndutiesmgt.events({

	'click .update':function(evt, tmpl){
	
	var currentdutie = Duties.findOne({_id: this._id});
	

	
	 var shareDialogInfo = {

	    template: Template.dutiesmgtForm,
	    title: "Update Dutie",
	    buttons: {
	      "update": {
	        class: 'btn-info',
	        label: 'Update'
	      },
	      "cancel": {
	        class: 'btn-danger',
	        label: 'Cancel'
	      }
	    }
	  }
	  rd7 = ReactiveModal.initDialog(shareDialogInfo);
	  rd7.buttons.update.on('click', function(button){

			var dutiid = currentdutie.event;
			var dutiename = $('#dutietype').val();
			var dutiedesc = $('.dutiedesc').val();
			var member = $('#member').val();
			var datetime = $('.datentime').val();
			var eventData = Events.findOne({
			  _id: currentdutie.event
			});

			alert(member);
			return;
			var memberdata = Members.findOne({
			  parent: member
			});

			if(memberdata){
				var msg = 'You are assign to event ' + dutiename + ', Date:' + datetime + ' Duration: ' + dutiedesc + '.';
				var phnnumber = memberdata.mobile;
				Meteor.call('sendsms', msg, phnnumber);
			}

			var dutiedesc = $('.dutiedesc').val();

			var datetime = $('.datentime').val();
			var member = $('.member').val();
			var dutiestatus = null;
			var addeddate = new Date();

			var dutieid = Session.get('updateDutie');
			
			var dutie = {
			  dutiename: dutiename,
			  dutiedesc: dutiedesc,
			  event: currentdutie.event,
			  datetime: datetime,
			  member: member,
			  dutiestatus: dutiestatus,
			  addeddate: addeddate
			};


			Meteor.call('updateDutie', dutieid, dutie, function(err, result){
				if(!err){
					toastr.success('Dutie Successfully Updated')
				} else {
					toastr.error('Dutie Not Updated')
				}

			});
		});



	rd7.show();
},	

	'click .delete':function(evt, tmpl){
	Session.set('dutiedelete', true);
	var id = this._id;
	Meteor.call('deleteDutie',id);	
	Session.set('dutiedeleteid', this._id);
	
	
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

		Meteor.startup(function(){


		var title = Session.get('assignType')
		if(title!=="")
		{
			title="Add Dutie";
		}
		else
		{
			
		}

	  var shareDialogInfo = {

	    template: Template.dutiesmgtForm,
	    title: title,
	    buttons: {
	      "ok": {
	        class: 'btn-info',
	        label: 'Ok'
	      },
	      "cancel": {
	        class: 'btn-danger',
	        label: 'Cancel'
	      }
	    }
	  }
	  
	  rd = ReactiveModal.initDialog(shareDialogInfo);
	  rd.buttons.ok.on('click', function(button){
			var dutiename;

			if (Session.get('job') === 'pg') {
			  dutiename = 'Photographer';
			}
			if (Session.get('job') === 'aw') {
			  dutiename = 'Article Writer';
			}
			if (Session.get('job') === 'coordi') {
			  dutiename = 'Coordinator';

			}
			if (Session.get('job') === 'gd') {
			  dutiename = 'Graphic Designer';
			}
			
			dutiename = $('#dutietype').val();

			var dutiedesc = $('.dutiedesc').val();

			var event = Session.get('editing_dutie_data');

			var member = $('.member').val();
			var datetime = $('.datentime').val();
			var eventData = Events.findOne({
			  _id: event
			});
			var memberdata = Members.findOne({
			  parent: member
			});
			if(memberdata){
				var msg = 'You are assign to event ' + dutiename + ', Date:' + datetime + ' Duration: ' + dutiedesc + '.';
				var phnnumber = memberdata.mobile;
				Meteor.call('sendsms', msg, phnnumber);
			}

			var dutiedesc = $('.dutiedesc').val();

			var datetime = $('.datentime').val();
			var member = $('.member').val();
			var dutiestatus = null;
			var addeddate = new Date();

			var userid = Meteor.userId();
			var options = {
			  dutiename: dutiename,
			  dutiedesc: dutiedesc,
			  event: event,
			  datetime: datetime,
			  member: member,
			  dutiestatus: dutiestatus,
			  addeddate: addeddate
			};


			Meteor.call('addDutie', options, function(err, result){
				if(!err){
					toastr.success('Dutie Successfully Added')
				} else {
					toastr.error('Dutie not Added')
				}

			});
		});
	  
	});


Template.dutiesmgt.events({
	'click .adddutiebtn':function(e, tmpl){
		rd7.show();
}	
})




Template.dutiesmgtForm.helpers = function(){

	return Duties.findOne({_id:Session.get('updateDutie')});
}



}
