var Model = ko.observableArray();

var guesses = firebase.database().ref('guesses');

guesses.on('child_added', function(data) {
	Model.push(data.val());
});

var modelToDatabase = function(data) {
	newGuess = guesses.push();
	newGuess.set(data);
}