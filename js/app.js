var ViewModel = function() {

	self = this;

	this.modelBindings = ko.observableArray();

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
	this.genderVal = ko.observable(true);
	//this.showHidePassword = ko.observable('password');
	this.showHideGuess = ko.observable(true);
	this.guessObject = {};
	this.alertNoInput = ko.observable(true);
	this.alertSuccess = ko.observable(true);
	this.alertNewEntry = ko.observable(true);
	this.submittedForReview = ko.observable(false);
	this.clearFields = function() {
		self.guesserName('');
		//self.password('');
		self.firstName('');
		self.middleName('');
		self.gender('');
		self.lbs('');
		self.oz('');
		self.length('');
		self.day('');
		self.time('');
		self.alertNewEntry(false);
	};

	this.submitGuess = function() {
		self.alertNoInput(true);
		if (self.guesserName() !== '' && self.firstName() !== '' && self.middleName() !== '' && self.lbs() !== '' && self.oz() !== '' && self.length() !== '' && self.day() !== '') {
			self.alertSuccess(false);
			if (self.showHideGuess() === true) {
				self.showHideGuess(false);
			};
			if (self.submittedForReview() === false) {
				clickReview();
				self.submittedForReview(true);
			};
		} else {
			self.alertNoInput(false);
			self.alertSuccess(true);
			self.showHideGuess(true);
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
		if (self.gender() !== 'Boy') {
			self.genderVal(false);
		} else {
			self.genderVal(true);
		};
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
			'time': self.time(),
			'genderVal': self.genderVal()
		};
		self.showHideGuess(true);
		self.alertSuccess(true);
		self.clearFields();
		modelToDatabase(self.guessObject);
		clickShare();
	};

	self.modelBindings = ko.computed(function() {
		return Model()
	});

};

ko.applyBindings(new ViewModel());

/* TO DO

push to firebase

*/