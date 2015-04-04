Router.configure({
  autoRender: false
});

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('admin', { path: '/admin' });
  this.route('contacts', { path: '/contacts' });
  /*this.route('/admin', function () {
    this.render('addMeals');
  });*/
});