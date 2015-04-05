Template.admin.helpers({
  meals: function () {
    return Meals.find({});
  },

  mealsCount: function () {
    return Meals.find().count();
  },

  portion: function() {
    return Session.get('q');
  }

});


Food = new Mongo.Collection('food');

Template.admin.events({

  "click .calc-today": function (event) {
    var resources = {
      calories: 2000,
      protein: 100};

    Meteor.call('meals', resources, 'cost', function(err, data) {

      Session.set('q', data);
    });
  },

  "submit .remove-all": function (event) {
    Meals.find().map( function(i) { Meals.remove(i._id) })
  },

  "submit .new-meal": function (event) {
    // This function is called when the new task form is submitted
    var text = event.target.meals_data.value;

    var lines = text.replace(/\r\n/g, "\n").split("\n");
    var newLines, newValue, i;

  // Use the map() method of Array where available
    newLines = lines.map(function(i) {
      var parts = i.split(",").map(function(j) {return j.trim()});
      if ( parts.length == 5 )
      {
        var obj = {
          name: parts[0],
          dishes: [
            {
              name: 'Test',
              nutrients: {fat: 4, calories: 666}
            }
          ],
          nutrients: {
            protein: parseFloat(parts[1]),
            fat: parseFloat(parts[2]),
            carbohydrates: parseFloat(parts[3]),
            calories:parseFloat(parts[4])
          }
        };

        Food.insert(obj);
        return obj
      }
      else
        {return parts.length + "/" + parts.join(",");}
    });

    text.value = newLines.join("\r\n");
    /*Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });*/

    // Clear form
    event.target.meals_data.value = newLines.join("\r\n");

    // Prevent default form submit
    return false;
  }
});
