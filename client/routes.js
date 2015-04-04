Router.configure({
  layoutTemplate : 'main'
});

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('admin', { path: '/admin2' });
  this.route('contacts', { path: '/contacts' });
  /*this.route('/admin', function () {
    this.render('addMeals');
  });*/
});