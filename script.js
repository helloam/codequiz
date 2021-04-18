
var timer = 60;
var runningTimer;
var score = 0;
var username = "";
var qNumber;
var finalScore;
var MAX_HIGH_SCORES = 5;

var start = document.getElementById("startButton");
var qContainer = document.getElementById("container");
var qElement = document.getElementById("question");
var answerButtons = document.getElementById("answers");
var countdown = document.getElementById("timerArea");
var scoreArea = document.getElementById("scoreArea");
var highScoresButton = document.getElementById("showScoresButton");

//LocalStorage Objects
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Questions are Here
var questions = [
  {
    question: "Which country has the largest human population?",
    answers: [
      { text: "USA", correct: false },
      { text: "China", correct: true },
      { text: "Germany", correct: false },
      { text: "Spain", correct: false }
    ]
  },
  {
    question: "Which of these is NOT a U.S. Federal Holiday?",
    answers: [
      { text: "Valentines Day", correct: true },
      { text: "Memorial Day", correct: false },
      { text: "Christmas Day", correct: false },
      { text: "Independence Day", correct: false }
    ]
  },
  {
    question: "How many kilometers are in one mile?",
    answers: [
      { text: "3.2", correct: false },
      { text: "5", correct: false },
      { text: "7.1", correct: false },
      { text: "1.6", correct: true }
    ]
  },
  {
    question: "Which planet is not part of our solar system?",
    answers: [
      { text: "Saturn", correct: false },
      { text: "Pluto", correct: false },
      { text: "Zion", correct: true },
      { text: "Mars", correct: false }
    ]
  },
  {
    question: "Which food chain makes the best fries?",
    answers: [
      { text: "In N Out", correct: false },
      { text: "McDonalds", correct: true },
      { text: "Five Guys", correct: false },
      { text: "Chik Fil A", correct: false }
    ]
  }
];

//Event Listeners

start.addEventListener("click", startQuiz);
highScoresButton.addEventListener("click", displayScores);

//To start the quiz
function startQuiz() {

    timer = 60;
  
    qNumber = 0;
    
    scoreArea.innerHTML = "";
    
    start.classList.add("hide");
  
    scoreArea.classList.add("hide");
  
    answerButtons.classList.remove("hide");
  
  
    qContainer.classList.remove("hide");
  
  
    startClock();
  
    while (answerButtons.firstChild) {
    
        answerButtons.removeChild(answerButtons.firstChild);
    
    }
  
    showQuestion(questions[qNumber]);
}

//To show the questions
function showQuestion(question) {

    qElement.innerText = question.question;

    question.answers.forEach(answer => {

      var button = document.createElement("button");
    
        button.innerText = answer.text;
    
        button.classList.add("btn");
    
        if (answer.correct) {
    
            button.dataset.correct = answer.correct;
    
        }
    
        button.addEventListener("click", selectAnswer);
    
        answerButtons.appendChild(button);
    });
}

//To start the timer
function startClock() {
  countdown.innerHTML = "Time Remaining: " + timer;
  if (timer <= 0) {
    gameOver();
    showResults();
  } else {
    timer -= 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}

//To save the answers
function selectAnswer(e) {

  var selectedButton = e.target;

    if (!selectedButton.dataset.correct) {
    
        timer = timer - 10;
    
        console.log(timer);
    }
    if (qNumber == questions.length - 1) {
    
        gameOver();
    
    } 
    else {
    
        clearQuestion();
    
        qNumber++;
    
        showQuestion(questions[qNumber]);
    
        
    }
}

//To clear the question
function clearQuestion() {
    
    while (answerButtons.firstChild) {
    
        answerButtons.removeChild(answerButtons.firstChild);
    
    }
}

//Function for when the quiz ends
function gameOver() {
  
    score = 0;

    clearInterval(runningTimer);
  
    countdown.innerHTML = "Finished";
  
    clearQuestion();
  
    showResults();
  
}

//Function to show quiz results
function showResults() {
    finalScore = timer;
    
    if (finalScore < 0) {
    
        finalScore = 0;
    
    }
    
    qElement.innerText = "";
  
    scoreArea.classList.remove("hide");
  
    answerButtons.classList.add("hide");
  
    scoreArea.innerHTML = `Your score is ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  
    username = document.getElementById("initials");
  
    saveButton = document.getElementById("save-btn");
  
    username.addEventListener("keyup", function() {
  
        saveButton.disabled = !username.value;
    });
}

//Collect and save high scores
function submitScores(e) {
    const score = {
    
        score: finalScore,
    
        name: username.value
    };
    
    highScores.push(score);
    
    highScores.sort((a, b) => b.score - a.score);
    
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    displayScores();
}

//To render high scores
function displayScores() {
  
    clearInterval(runningTimer);
    
    countdown.innerHTML = "";
    
    clearQuestion();
    
    qElement.innerText = "";
    
    scoreArea.classList.remove("hide");

    scoreArea.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
    
    var highScoresList = document.getElementById("highScoresList");
    
    highScoresList.innerHTML = highScores
    
    .map(score => {return `<ul class="scoresList">${score.name} - ${score.score}</ul>`;}).join("");
  
    startButton.classList.remove("hide");
  
    highScoresButton.classList.add("hide");
};

//To reset scoring
function clearScores() {
  
    highScores = [];
  
    highScoresList.innerHTML = "<h3>Scores have been Cleared</h3>";
  
    document.getElementById("clearScores").classList.add("hide");
}