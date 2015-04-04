
function updateView() {
    //diet_period
    var period = 'day';
    if (document.getElementById('weekly_diet').checked) {
      period = 'week';
    }
    
    initDaysCollection(period);

    // save meal count state
    daily_limits = document.getElementsByName('meals_limit');
    for (var i = 0; i < daily_limits.length; i++) {
        if (daily_limits[i].checked) {
            Session.set('meals_limit', parseInt(daily_limits[i].value));
        }
    }
}


Template.index.onRendered(function () {
    updateView();
});

Template.index.events({
  'change .formitem, submit .new-diet': function (event) {
    updateView();
    return false;
  }
});