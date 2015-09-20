Router.configure({
  layoutTemplate: 'main'
})

Router .map( function () {
  this.route('splash', {
    path: '/'      
  });
  
  this.route('home', {
    path: '/home'
  });

  this.route('navigation', {
    path: '/navigation'
  });

  this.route('sidebar', {
    path: '/sidebar'
  });

   this.route('post', {
    path: '/post'
  });


  this.route('eventhome', {
    path: '/upcomingevents'
  });


  this.route('coveredevents', {
    path: '/coveredevents'
  });

this.route('eventmanagement', {
    path: '/eventmanagement'
  });

this.route('coveredeventsmgt', {
    path: '/coveredeventsmgt'
  });

  this.route('dutiehome', {
    path: '/dueduties'
  });

   this.route('coveredduties', {
    path: '/coveredduties'
  });

this.route('dutiesmgt', {
    path: '/dutiesmgt'
  });

  this.route('member', {
    path: '/member'
  });

  this.route('membermgt', {
    path: '/membermgt'
  });

  this.route('messages', {
    path: '/messages'
  });

  this.route('myduties', {
    path: '/myduties'
  });
  this.route('chat', {
    path: '/chat',
    waitOn: function(){
      this.subscribe('chats')
    }
  });

  this.route('eventcalendar', {
    path: '/eventcalendar'
  });
})
