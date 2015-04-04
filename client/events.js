Template.body.events({
  "submit .new-diet": function (event) {
    //diet_period
    var period = 'day';
    if (document.getElementById('weekly_diet').checked) {
      period = 'week';
    }
    
    initDaysCollection(period);

    // save meal count state
    daily_limits = document.getElementsByName('meals_limit');
    for (var i = 0; i < daily_limits.length; i++) {
        console.log(daily_limits[i].value);

        if (daily_limits[i].checked) {
            Session.set('meals_limit', parseInt(daily_limits[i].value));
        }
    }
    
    // Prevent default form submit
    return false;
  }
});