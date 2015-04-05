Router.configure({
  layoutTemplate : 'main',
  loadingTemplate: 'loading'
});

Router.map(function () {
  this.route('index', { 
  	path: '/'
  	/*,
  	waitOn: function() {
    	return Meteor.subscribe('qmkkjeals');
	}*/
  });
  this.route('admin', { path: '/admin2' });
  this.route('contacts', { path: '/contacts' });
  /*this.route('/admin', function () {
    this.render('addMeals');
  });*/
});