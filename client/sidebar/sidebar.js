Template.sidebar.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Members");
	Meteor.subscribe("Users");
	})	

	var memdata = Members.findOne({parent:Meteor.userId()});
	if(memdata.adminrole ==='none')
	{
		alert('none');
	}

	if(memdata.adminrole ==='pg')
	{
		Session.set('dutiemgt',true);
	}

	if(memdata.adminrole ==='aw')
	{
		Session.set('dutiemgt',true);
	}

	if(memdata.adminrole ==='it')
	{
		Session.set('dutiemgt',true);	
	}

	if(memdata.adminrole ==='gd')
	{
		Session.set('dutiemgt',true);
	}

	if(memdata.adminrole ==='mkt')
	{
		Session.set('dutiemgt',true);
		
	}	

	if(memdata.adminrole ==='hr')
	{
		Session.set('membermgt',true);
		Session.set('eventmgt',true);
		Session.set('dutiemgt',true);
	}

	if(memdata.adminrole ==='all')
	{
		Session.set('membermgt',true);
		Session.set('eventmgt',true);
		Session.set('dutiemgt',true);
	}			
}



Template.sidebar.membermgt = function(){

	return Session.get('membermgt');
}

Template.sidebar.eventmgt = function(){

	return Session.get('eventmgt');
}

Template.sidebar.dutiemgt = function(){

	return Session.get('dutiemgt');
}

