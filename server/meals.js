Meteor.methods({
  "meals": function() {
    var c = Cassowary;
    var solver = new c.SimplexSolver();

    return new c.Variable({name:'x'}).toString();
  }
});