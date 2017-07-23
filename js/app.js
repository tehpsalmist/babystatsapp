var Model = ko.observableArray([{
	'guesserName': 'Ben Steward',
	//'password': 'password',
	'firstName': 'Zechariah',
	'middleName': 'Abraham',
	'gender': 'Boy',
	'lbs': '8',
	'oz': '13',
	'length': '22',
	'day': '2017-07-26',
	'time': 'Noon'
}]);

var newGuess = ko.observable({});

var ViewModel = function() {

	self = this;

	this.guesserName = ko.observable('');
	//this.password = ko.observable('');
	this.firstName = ko.observable('');
	this.middleName = ko.observable('');
	this.gender = ko.observable('');
	this.lbs = ko.observable('');
	this.oz = ko.observable('');
	this.length = ko.observable('');
	this.day = ko.observable('');
	this.time = ko.observable('');
	//this.showHidePassword = ko.observable('password');
	this.showHideGuess = ko.observable(true);
	this.guessObject = {};
	this.alertNoInput = ko.observable(true);

	this.submitGuess = function() {
		self.alertNoInput(true);
		if (self.guesserName() !== '' && self.firstName() !== '' && self.middleName() !== '' && self.lbs() !== '' && self.oz() !== '' && self.length() !== '' && self.day() !== '') {
			if (self.showHideGuess() === true) {
				self.showHideGuess(false);
			};
		} else {
			self.alertNoInput(false);
		};
	};

	/*this.toggleShowPassword = function() {
		if (self.showHidePassword() === 'password') {
			self.showHidePassword('text');
		} else {
			self.showHidePassword('password');
		};
	};*/

	this.shareGuessToWorld = function() {
		self.guessObject = {
			'guesserName': self.guesserName(),
			//'password': self.password(),
			'firstName': self.firstName(),
			'middleName': self.middleName(),
			'gender': self.gender(),
			'lbs': self.lbs(),
			'oz': self.oz(),
			'length': self.length(),
			'day': self.day(),
			'time': self.time()
		};
		Model().push(self.guessObject);
		self.modelBindings(Model());
		self.showHideGuess(true);
	};

	this.modelBindings = ko.observable(Model());

};

ko.applyBindings(new ViewModel());

/* TO DO

push to firebase

*/