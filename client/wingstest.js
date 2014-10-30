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

  this.route('eventpage', {
    path: '/eventpage'
  });

this.route('eventmgt', {
    path: '/eventmgt'
  });

  this.route('duties', {
    path: '/duties'
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
  }),

  this.route('myduties', {
    path: '/myduties'
  })
  this.route('chat', {
    path: '/chat',
    waitOn: function(){
      this.subscribe('chats')
    }
  });
})
