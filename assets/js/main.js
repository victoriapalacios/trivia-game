var gameStart;
var gameHTML;
var counter = 20;
var questionArray = ["What animal has the longest lifespan?", "What is the only mammal capable of true flight?", "What is the fastest flying bird in the world?", "What animal has the highest blood pressure?", "How many times can a hummingbird flap its wings per second?"];
var answerArray = [["Elephant", "Blue Whale", "Giant Tortoise", "Locust"], ["Bat", "Flying Squirrel", "Ocelot", "Humming Bird"], ["Harpy Eagle", "Peregrine Falcon", "Horned Sungem", "Spine-Tailed Swift"], ["Giraffe", "Blue Whale", "Elephant", "Flea"], ["20", "40", "80", "160"]];
var imageArray = ["<img src='assets/images/tortoise.png'>", "<img src='assets/images/bat.png'>", "<img src='assets/images/falcon.png'>", "<img src='assets/images/giraffe.png'>", "<img src='assets/images/hummingbird.png'>"];
var correctAnswers = ["C. Giant Tortoise", "A. Bat", "B. Peregrine Falcon", "A. Giraffe", "C. 80"];
var questionCounter = 0;
var selecterAnswer;
var Clock;
var correct = 0;
var wrong = 0;
var unanswered = 0;

$(document).ready(function() {

	// Below code is a function that creates the splash with start button
	function splash() {
		gameStart = "<a class='start-button'>Start Quiz</a>";
		$(".game").html(gameStart);
	}
	splash();

	//Below code generate questions when start button is clicked
	$("body").on("click", ".start-button", function(event){
		createHTML();
		countdown();
	});

	//Below code is what happens when a user chooses a question - must be determed as right or wrong
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCounter]) {
			//If they are correct, one is added to win and they get winning message. else, one is added to losses and they get loss message.
			//Note: clearInterval is a JS feature that clears a timer with a setInterval() method
			clearInterval(Clock);
			winMessage();
		}
		else {
			clearInterval(Clock);
			lossMessage();
		}
	});

	// Below code calles the resetGame function which sets the score back to zero and askes questions from beginning
	$("body").on("click", ".reset-button", function(event){
		resetGame();
	});

});

// Below code is what happens when a player runs out of time. One is addded to losses, and the message is displayed that they ran out of time.
function timeOutLoss() {
	unanswered++;
	gameHTML = "<p>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".game").html(gameHTML);
	setTimeout(questionAsked, 5000);
}

// Below code is what happens when a player answers correctly. One is added to wins, and win message is displayed.
function winMessage() {
	correct++;
	gameHTML = "<p>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".game").html(gameHTML);
	setTimeout(questionAsked, 5000);
}
// Below code is what happens when a player answers wrong. One is added to losses, and loss message is displayed.
function lossMessage() {
	wrong++;
	gameHTML = "<p>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".game").html(gameHTML);
	setTimeout(questionAsked, 5000);
}

// Below code is what happens when the game is over. User can view their score of wins/losses/unanswered
function createHTML() {
	gameHTML = "<p>Time Remaining: <span class='timer'>20</span></p><p>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".game").html(gameHTML);
}


function questionAsked() {
	if (questionCounter < 4) {
	questionCounter++;
	createHTML();
	counter = 20;
	countdown();
	}
	else {
		finalScreen();
	}
}

function countdown() {
	Clock = setInterval(timed, 1000);
	function timed() {
		if (counter === 0) {
			clearInterval(Clock);
			timeOutLoss();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p>All done, here's how you did!" + "</p>" + "<p>Correct Answers: " + correct + "</p>" + "<p>Wrong Answers: " + wrong + "</p>" + "<p>Unanswered: " + unanswered + "</p>" + "<a class='reset-button' href='#' role='button'>Reset The Quiz!</a>";
	$(".game").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correct = 0;
	wrong = 0;
	unanswered = 0;
	counter = 20;
	createHTML();
	countdown();
}
