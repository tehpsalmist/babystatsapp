var Model = ko.observableArray();

var guesses = firebase.database().ref('guesses');

guesses.on('child_added', function(data) {
	Model.push(data.val());
});

var modelToDatabase = function(data) {
	newGuess = guesses.push();
	newGuess.set(data);
}

// Click Data

var reviewClicks = firebase.database().ref('stats/reviewClicks');

var clickReview = function() {
  reviewClicks.transaction(function(clicks) {
  	if (clicks === null) {
  		clicks = 0;
  	}
  	return clicks + 1;
  });
}

var shareClicks = firebase.database().ref('stats/shareClicks');

var clickShare = function() {
  shareClicks.transaction(function(clicks) {
  	if (clicks === null) {
  		clicks = 0;
  	}
  	return clicks + 1;
  });
}
/*function nameOfFunc(postRef, uid) {
  postRef.transaction(function(post) {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}*/