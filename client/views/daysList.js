//Meals = new Meteor.Collection('meals');

Template.daysList.helpers({
    days: function () { return Days.find(); }
});
