// Hooking DOM elements into js variables
var timerEl = document.querySelector("#timer");
var quizfield = document.querySelector("#quizfield");
var beginEl = document.querySelector("#begin");
var introEl = document.querySelector("#intro");
var questionEl = document.querySelector("#qDisplay");
var choiceA = document.querySelector('#opA');
var choiceB = document.querySelector('#opB');
var choiceC = document.querySelector('#opC');
var choiceD = document.querySelector('#opD');
var promptEl = document.querySelector('#prompt');
var questionNum = document.querySelector("#qNumber");
var messageEl = document.querySelector("#message");

// Setting some global variables that multiple functions access
var index = 0;
var score = 0;
var timeLeft = 90;

// Creating quiz content
var question1 = {
    name: "Question 1",
    prompt: "What is the DOM?",
    opA: "The html file of a webpage",
    opB: "An API provided by the browser",
    opC: 'The "Direct-Object Method"',
    opD: 'The "Dynamic Operation Method"',
    correct: 'opB'
}
var question2 = {
    name: "Question 2",
    prompt: "What is a method?",
    opA: "An algorithm for calculating an expression",
    opB: "Just another name for a function",
    opC: 'A strategy for writing code',
    opD: 'An action which can be applied to an object',
    correct: 'opD'
}
var question3 = {
    name: "Question 3",
    prompt: "What is the proper way to define a function?",
    opA: "function myFunction {...} ();",
    opB: "myFunction: ... ;",
    opC: 'function myFunction() {...};',
    opD: 'document.addFunction.myFunction(...);',
    correct: 'opC'
}
var question4 = {
    name: "Question 4",
    prompt: "What is a boolean?",
    opA: "A whole number which can be used in an expression",
    opB: 'A datatype which can either be "true" or "false"',
    opC: 'Another interchangable name for a variable',
    opD: 'A word programmers came up with to describe messy code',
    correct: 'opB'
}
var question5 = {
    name: "Question 5",
    prompt: "How do you remove the last element from an array?",
    opA: "myArray.pop();",
    opB: "myArray.contract();",
    opC: 'myArray.snap();',
    opD: 'myArray.shift();',
    correct: 'opA'
}
var quizContent = [question1, question2, question3, question4, question5];

// Creates timer
function countdown() {

    var timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft --;
        }
        else {
            timerEl.textContent = '0';
            clearInterval(timeInterval);
            timerEl.setAttribute("hidden", "true");
            endQuiz();
        }
        
    }, 1000);    
}

// Displays the current question when called
function displayQuestion(question) {
    questionNum.textContent = question.name;
    promptEl.textContent = question.prompt;
    choiceA.textContent = question.opA;
    choiceB.textContent = question.opB;
    choiceC.textContent = question.opC;
    choiceD.textContent = question.opD;
}

// Sets function to begin quiz and hooks to start button
beginEl.addEventListener("click", quizStart);
function quizStart() {
    countdown();
    introEl.style.display = "none";
    quizfield.classList.remove("hidden");
    displayQuestion(quizContent[index])
}

// End of quiz functions
function displayScoreboard() {
    beginEl.remove()
    messageEl.textContent = "Your score was " + score + " out of a possible " + quizContent.length + " points. You may enter your initals below to save your score."

    introEl.style.removeProperty("display");
}
function endQuiz() {
    quizfield.remove();
    displayScoreboard();
    introEl.style.removeProperty("display");
    timeLeft = 0;
}

// checks for clicks for quiz functionality
questionEl.addEventListener("click", function(event) {
            var target = event.target;
            console.log("clicked " + target.id);
            console.log(index);
            function checkAnswer(target) {
                if (target.id === quizContent[index].correct) {
                    score++;
                    console.log("score: " + score + "/" + quizContent.length);
                }
                else {
                    timeLeft-= 5;
                }
            }
            checkAnswer(target)
            if (index < (quizContent.length-1)) {
                index++;
            }
            else {
                endQuiz();
            }
            displayQuestion(quizContent[index])
            
        })