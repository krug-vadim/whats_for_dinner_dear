//Meals = new Meteor.Collection('meals');

Template.mealsList.helpers({
    meals: function () { return Meals.find(); }
});
