var ViewModel = function() {

	self = this;
	
	// These observables track the data being edited and displayed in the form and review fields.
	this.guesserName = ko.observable('');
		// this.password = ko.observable(''); //Decided against using a password, but kept it in just in case. ;)
	this.firstName = ko.observable('');
	this.middleName = ko.observable('');
	this.gender = ko.observable('');
	this.lbs = ko.observable('');
	this.oz = ko.observable('');
	this.length = ko.observable('');
	this.day = ko.observable('');
	this.time = ko.observable('');

	/*
	The genderVal observable is added to the guessObject and stored in
	firebase by shareGuessToWorld() with the other guess fields, so it can be
	used to determine the color of the <li> background when the guess is
	posted to #shared-guesses via the knockout data-bind to css property.
	*/
	this.genderVal = ko.observable(true);

	//this.showHidePassword = ko.observable('password'); //Decided against using a password, but kept it in just in case. ;)
	
	/*
	These observables hold boolean values that affect data-bind="css: {'display-none': observableHere}"
	properties for various DOM elements. These values are altered by various
	functions to either display (false) or hide (true) these elements.
	*/
	this.showHideGuess = ko.observable(true);
	this.alertNoInput = ko.observable(true);
	this.alertSuccess = ko.observable(true);
	this.alertNewEntry = ko.observable(true);

	// Initial object that eventually passes the new guess data to firebase
	this.guessObject = {};

	/*
	This observable ensures that the review guesses button only logs one click
	per page session (assumption: only one user will upload a guess per page load).
	After submitGuess() is run, the value sets to true, preventing a second click
	from being logged if the user resubmits the guess before posting it.
	The rationale here is that I wanted to track the "conversion rate" of
	reviewed guesses, as I suspected that not every user was completing the process
	and sharing their guesses to firebase (which is a darn shame).
	*/
	this.submittedForReview = ko.observable(false);

	/*
	This function resets the form, so the user can guess again (which the alert
	discourages), or another user can step in a submit their guess on the same device.
	Also, it would be confusing for the form to remain filled out after hitting
	"share," as it would give the immediate impression that it didn't work,
	and if the user shared it again, there would be scads of double entries. Not good.
	*/
	this.clearFields = function() {
		// reset the form fields via data-bound observables
		self.guesserName('');
		//self.password(''); //Decided against using a password, but kept it in just in case. ;)
		self.firstName('');
		self.middleName('');
		self.gender('');
		self.lbs('');
		self.oz('');
		self.length('');
		self.day('');
		self.time('');
		// Boolean switch: results in an alert being displayed that tells the user they
		// successfully shared their guesses.
		self.alertNewEntry(false);
	};

	/* function called when user wants to review their guesses.
		1. The no input alert is removed, in case it was currently displayed.
		2. IF they filled in all input fields,
			a. then their guesses are displayed (using showHideGuess(false)),
			b. and an alert notifies them of the success (using alertSuccess(false)).
			c. IF this is the first guess submission of the page load, a click is also logged in firebase.
		3. IF they left any fields blank,
			a. an alert reminds them to fill in all the fields.
			b. success alert is hidden (if it was showing)
			c. the #guess-summary is hidden, which prevents the user from sharing an incomplete guess.
	*/
	this.submitGuess = function() {
		self.alertNoInput(true);
		if (self.guesserName() !== '' && self.firstName() !== '' && self.middleName() !== '' && self.lbs() !== '' && self.oz() !== '' && self.length() !== '' && self.day() !== '') {
			self.alertSuccess(false);
			self.showHideGuess(false);
			if (self.submittedForReview() === false) {
				clickReview();
				self.submittedForReview(true);
			};
		} else {
			self.alertNoInput(false);
			self.alertSuccess(true);
			self.showHideGuess(true);
		};
		window.location.hash = 'guess-summary';
	};

	/*this.toggleShowPassword = function() {
		if (self.showHidePassword() === 'password') {
			self.showHidePassword('text');
		} else {
			self.showHidePassword('password');
		};
	};*/ //Decided against using a password, but kept it in just in case. ;)

	/*
	This function posts the guesses to the database.
		1. IF
			a. gender is girl, then genderVal is false.
			b. gender is boy, then genderVal is true.
				This boolean is used in the display later on to color the background of the <li>
		2. The guessObject is constructed.
		3. The guessObject is passed to firebase via modelToDatabase().
		4,5,6. The alerts are cleared, the #guess-summary hidden, and form fields reset.
		7. A click is logged to firebase for the Share button.
	*/
	this.shareGuessToWorld = function() {
		if (self.gender() !== 'Boy') {
			self.genderVal(false);
		} else {
			self.genderVal(true);
		};
		self.guessObject = {
			'guesserName': self.guesserName(),
			//'password': self.password(), //Decided against using a password, but kept it in just in case. ;)
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
		modelToDatabase(self.guessObject);
		self.showHideGuess(true);
		self.alertSuccess(true);
		self.clearFields();
		clickShare();
	};

	// These observables are bound to the collapse/expand feature in #shared-guesses
	this.buttonText = ko.observable('Collapse Shared Guesses')
	this.collapse = ko.observable(false);
	this.collapseToggle = function() {
		if (self.collapse() === true) {
			self.collapse(false);
			self.buttonText('Collapse Shared Guesses');
		} else {
			self.collapse(true);
			self.buttonText('Expand Shared Guesses');
		};
	};

	/*
	Every guessObject that has been passed to firebase is retrieved and this observable
	updates automatically with each new entry (see database.js for details on the Model),
	so that the Model data can be bound to the DOM.
	*/
	self.modelBindings = ko.computed(function() {
		return Model()
	});

};

// Knockout's applyBindings function creates an instance of ViewModel() and, well, applies the bindings to the HTML/DOM.
ko.applyBindings(new ViewModel());