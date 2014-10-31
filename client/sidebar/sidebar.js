Template.sidebar.rendered = function(){

	Deps.autorun(function(){
	Meteor.subscribe("Members");
	Meteor.subscribe("Users");
	})	

	var memdata = Members.findOne({parent:Meteor.userId()});
	if(memdata && memdata && memdata.adminrole ==='none')
	{
		alert('none');
	}

	if(memdata && memdata.adminrole ==='pg')
	{
		Session.set('dutiemgt',true);
	}

	if(memdata && memdata.adminrole ==='aw')
	{
		Session.set('dutiemgt',true);
	}

	if(memdata && memdata.adminrole ==='it')
	{
		Session.set('dutiemgt',true);	
	}

	if(memdata && memdata.adminrole ==='gd')
	{
		Session.set('dutiemgt',true);
	}

	if(memdata && memdata.adminrole ==='mkt')
	{
		Session.set('dutiemgt',true);
		
	}	

	if(memdata && memdata.adminrole ==='hr')
	{
		Session.set('membermgt',true);
		Session.set('eventmgt',true);
		Session.set('dutiemgt',true);
	}

	if(memdata && memdata.adminrole ==='all')
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

var navs = {
  "home":"News Feeds",
  "member":"Members",
  "membermgt":"Members Profile Management",
  "eventpage":"Events",
  "eventmgt":"Events Management",
  "myduties":"My Duties",
  "duties":"Duties",
  "dutiesmgt":"Duties Management",
  "chat":"Chat",
  "groups":"Groups"
};

Template.sidebar.navList = function(){
	return _.pairs(navs);
}

Template.sidebar.isActive = function(){
	return Router.current().path == "/"+ this[0]
}

