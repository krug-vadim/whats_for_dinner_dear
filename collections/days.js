Days = new Meteor.Collection(null);

Periods = {
	'day': ['На день'],
	'week': ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение']
};

initDaysCollection = function(key) {
	Days.remove({});

	if (!(key in Periods)) {
		console.log('Unknown period type', key);
		return;
	}

	var days = Periods[key]; 
	for (var i = 0; i < days.length; i++ ) {
  		Days.insert({ title: days[i] });
	}

	return days.length;
};