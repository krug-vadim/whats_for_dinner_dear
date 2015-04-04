Router.route('/admin', function () {
  this.render('addMeals');
});

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('addMeals', { path: '/admin' });
  /*this.route('/admin', function () {
    this.render('addMeals');
  });*/
});