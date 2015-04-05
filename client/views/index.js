function calcPortions(meals, resources) {
  var i, j;

    var days = Days.find().count();    
    Meteor.call('mealsForDays', resources, 'cost', days, meals, function(err, data) {
        //updateDays(data);        
        console.log(data);
        document.getElementById('create-new-diet').removeAttribute('disabled');
        Session.set('qmeals', data);        
    });
}

function updateDays(data) {
    var days = Days.find().fetch();    
    for(var i=0; i < days.length; i++) {

        //days[i][''].update({$set: {C:false}});
    }
}
/*
    Update days view, according to user input.
*/
function updateView() {    
    Session.set('qmeals', []);    
    document.getElementById('create-new-diet').setAttribute('disabled', 'disabled');

    //get diet period
    var period = 'day';
    if (document.getElementById('weekly_diet').checked) {
      period = 'week';
    }
        
    var resources = {
      protein:       parseInt(document.getElementById('proteins-input').value),
      fat:           parseInt(document.getElementById('fats-input').value),
      carbohydrates: parseInt(document.getElementById('carbohydrates-input').value)
    };
    var day_count = initDaysCollection(period);

    // save meal count state to session
    daily_limits = document.getElementsByName('meals_limit');
    for (var i = 0; i < daily_limits.length; i++) {
        if (daily_limits[i].checked) {
            calcPortions(parseInt(daily_limits[i].value), resources);
            return;
        }
    }
}

Template.index.onRendered(function () {
    updateView();
});

Template.mealsList.helpers({
    qmeals: function () { return Session.get('qmeals'); }
});

Template.index.events({
  'change .formitem, click #create-new-diet, input.form-control': function (event) {
    updateView();
    return false;    
  },

  'click li': function (event) {
    //event.target.setAttribute('class', 'active');
  }
});
