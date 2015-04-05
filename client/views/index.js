function calcPortions(meals, resources) {
  var i, j, k, counter;

    var days = Days.find().count();
    Meteor.call('mealsForDays', resources, 'cost', days, meals, function(err, data) {
        //updateDays(data);

        for(var i=0; i < data.length; i++) {
            counter = 0;
            // meals
            for (var j=0; j < data[i]['meals'].length; j++) {
                // dishes
                for (var k=0; k < data[i]['meals'][j].length; k++) {
                    if (data[i]['meals'][j][k]) {
                        counter += data[i]['meals'][j][k]['nutrients']['calories'];
                    }
                }
            }
            data[i]['total_calories'] = counter;
        }

        console.log(data);

        document.getElementById('create-new-diet').removeAttribute('disabled');
        Session.set('qmeals', data);
    });
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
      carbohydrates: parseInt(document.getElementById('carbohydrates-input').value),
      calories: 1000
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
    qmeals: function () { return Session.get('qmeals'); },
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
