// DATABASE/APP FUNCTIONS

// This observableArray stores the guessObjects by retrieving them from firebase
var Model = ko.observableArray();

// establishes reference to the location of the guessObjects
var guesses = firebase.database().ref('guesses');

/*
an event listener built into firebase that sends any added children
to the Model via JSON format.
*/
guesses.on('child_added', function(data) {
	Model.push(data.val());
});

/*
This function takes a parameter that is then translated into a new
guesses node. In app.js, shareGuessToWorld() passes the guessObject into
this function.
*/
var modelToDatabase = function(data) {
	newGuess = guesses.push();
	newGuess.set(data);
}

// CLICK DATA FUNCTIONS

// establishes a reference for storing clicks of the review button
var reviewClicks = firebase.database().ref('stats/reviewClicks');

// ***** Read about the transaction method in firebase here: https://firebase.google.com/docs/reference/js/firebase.database.Reference#transaction

// when called, this function increments the reviewClick count by 1.
var clickReview = function() {
  reviewClicks.transaction(function(clicks) {
  	if (clicks === null) {
  		clicks = 0;
  	}
  	return clicks + 1;
  });
}

// establishes a reference for storing clicks of the share button
var shareClicks = firebase.database().ref('stats/shareClicks');

// when called, this function increments the shareClick count by 1.
var clickShare = function() {
  shareClicks.transaction(function(clicks) {
  	if (clicks === null) {
  		clicks = 0;
  	}
  	return clicks + 1;
  });
}