//Meals = new Meteor.Collection('meals');

Template.daysList.helpers({
    days: function () { return Days.find(); },
    meals: function () { return Meals.find({}, {limit: Session.get('meals_limit')}); }
});
