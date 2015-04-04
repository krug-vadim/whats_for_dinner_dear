//Meals = new Meteor.Collection('meals');

Template.mealsList.helpers({
    meals: function () { return Meals.find({}, {limit: Session.get('meals_limit')}); }
});
