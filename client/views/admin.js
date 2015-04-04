Meals = new Mongo.Collection("meals");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.admin.helpers({
    meals: function () {
      // Show newest tasks first
      return Meals.find({});
    },

    mealsCount: function () {
      return Meals.find().count();
    }
  });

  Template.admin.events({

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
            nutrients: {
              protein: parseFloat(parts[1]),
              fat: parseFloat(parts[2]),
              carbohydrates: parseFloat(parts[3]),
              calories:parseFloat(parts[4])
            }
          };

          Meals.insert(obj);
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
}
