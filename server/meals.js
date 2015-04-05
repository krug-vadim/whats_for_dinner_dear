Food = new Mongo.Collection('food');

Meteor.methods({
  "meals": function(resources, profitName) {

    var meals = Food.find({}).fetch();

    //console.log("Found: " + meals.length);

    var c = Cassowary;
    var solver = new c.SimplexSolver();

    // Objective: Profit
    var profit = new c.ObjectiveVariable({name: 'profit'});

    //console.log("Added profit");

    /*for p in _.keys problem.products
      products[p] = new c.Variable {name: p}
      solver.addConstraint(new c.Inequality products[p], c.GEQ, 0)*/
    var dishes = {};
    var dishesIndex = {};
    meals.forEach(function(meal) {
        //console.log("Working with food: " + meal.name);
        dishes[meal.name] = new c.Variable({name: meal.name});
        dishesIndex[meal.name] = meal;
        solver.addConstraint(new c.Inequality(dishes[meal.name], c.GEQ, 0));
        solver.addConstraint(new c.Inequality(dishes[meal.name], c.LEQ, 5));
    });

    var z = meals.map(function(m){
        return new c.Expression(dishes[m.name], 1);
    });

    solver.addConstraint(new c.Inequality(
        z.reduce(function(ex,e) { return ex.plus(e) }, new c.Expression()), c.LEQ, 5));

    /*productProfit = _.map _(products).keys(), (p) ->
            new c.Expression products[p], -1 * problem.products[p].profit */
    var dishesProfit = meals.map(function(meal) {
        d = meal.name
        //console.log("Adding food " + dishes[d] + " profit " + meal.nutrients[profitName]);
        return new c.Expression( dishes[d], -1 * 20 + 5 * meals.length * Math.random()/*meal.nutrients[profitName]*/ ); // XXX: change to real profit
    });

    /*# profit = 13 * ale + 23 * beer
    solver.addConstraint(new c.Equation profit,
      _.reduce productProfit, ((ex, e) -> ex.plus e), new c.Expression) */
    //console.log("Adding profit function");
    solver.addConstraint(new c.Equation(profit,
        dishesProfit.reduce(function(ex,e) { return ex.plus(e) }, new c.Expression())));

    //for resource in _.keys problem.resources
    //  r = resources[resource] = new c.Variable {name: resource}
    //  resourceLimits = _.map _(products).keys(), (p) ->
    //    new c.Expression products[p], problem.products[p][resource]
    //  solver.addConstraint(new c.Equation r,
    //    _.reduce resourceLimits, ((ex, e) -> ex.plus e), new c.Expression)
    //  solver.addConstraint(new c.Inequality r, c.LEQ, problem.resources[resource])
    //    .addConstraint(new c.Inequality r, c.GEQ, 0)
    //console.log("Adding resources limits");
    Object.keys(resources).forEach(function(resource) {
        //console.log("Adding resource: " + resource);

        var r = new c.Variable({name:resource});

        var resourceLimits = meals.map(function(meal) {
            //console.log("\t" + dishes[meal.name] + " resource limit: " + meal.nutrients[resource]);
            return new c.Expression(dishes[meal.name], meal.nutrients[resource]);
        });

        solver.addConstraint(new c.Equation(r,
            resourceLimits.reduce(function(ex,e){ return ex.plus(e); }, new c.Expression())));

        //console.log("Resource LEQ " + resources[resource]);
        solver.addConstraint(new c.Inequality(r, c.LEQ, resources[resource]));
        solver.addConstraint(new c.Inequality(r, c.GEQ, 0));
    });

    solver.optimize(profit);
    solver.resolve();

    return Object.keys(dishes).filter(function(d) {
        return dishes[d].value.toFixed(0) > 0;
    }).map(function(d) {
        //console.log(d + " == " + dishes[d].value);
        return {name: d, value: (100.0 * dishes[d].value).toFixed(1), nutrients: dishesIndex[d].nutrients};
    });
  },

  "mealsForDays": function(resources, profitName, days, meals) {
     var output = [];
     var dayNames = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресение'];

     for (var i = 0; i < days; i++)
     {
          output[i] = {meals: []};
          if ( days == 1)
            output[i]['day'] = 'Сегодня';
          else
            output[i]['day'] = dayNames[i%7];
         for (var j = 0; j < meals; j++)
         {
            output[i]['meals'][j] = Meteor.call('meals', resources, profitName);
            //console.log(output[i]['meals'][j]);
         }
     }

     return output;
  }
});