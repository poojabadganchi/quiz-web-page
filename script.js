const quizData = [
  {
    question: "1. What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"],
    answer: "New Delhi"
  },
  {
    question: "2. Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "3. Which is the largest ocean in the world?",
    options: ["Atlantic ocean", "Indian ocean", "Pacific ocean", "Arctic ocean"],
    answer: "Pacific ocean"
  },
  {
    question: "4. Who wrote the National Anthem of India?",
    options: ["Mahatma Gandhi", "Rabindranath Tagore", "Jawaharlal Nehru", "Subhas Chandra Bose"],
    answer: "Rabindranath Tagore"
  }
];

let currentQuestion = 0;
let score = 0;
let username = "";
let time = 0;
let timerInterval;

// Elements
const startBox = document.getElementById("start-box");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const finalScore = document.getElementById("final-score");
const userDisplay = document.getElementById("user-display");
const timerDisplay = document.getElementById("timer");
const timeTaken = document.getElementById("time-taken");

// Start Quiz
function startQuiz() {
  username = document.getElementById("username").value;

  if (username === "") {
    alert("Please enter your name");
    return;
  }

  startBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  userDisplay.textContent = "Player: " + username;

  startTimer();
  loadQuestion();
}

// Timer
function startTimer() {
  timerInterval = setInterval(function () {
    time++;
    timerDisplay.textContent = "Time: " + time + " sec";
  }, 1000);
}

// Load Question
function loadQuestion() {
  nextBtn.disabled = true;
  options.innerHTML = "";

  const currentQuiz = quizData[currentQuestion];
  question.textContent = currentQuiz.question;
  progress.textContent = "Question " + (currentQuestion + 1) + " of " + quizData.length;

  currentQuiz.options.forEach(function (option) {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");

    button.onclick = function () {
      checkAnswer(button, option);
    };

    options.appendChild(button);
  });
}

// Check Answer
function checkAnswer(selectedButton, selectedOption) {
  const correctAnswer = quizData[currentQuestion].answer;
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(function (button) {
    button.disabled = true;

    if (button.innerText === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedOption !== correctAnswer) {
    selectedButton.classList.add("wrong");
  } else {
    score++;
  }

  nextBtn.disabled = false;
}

// Next Button
nextBtn.addEventListener("click", function () {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show Result
function showResult() {
  clearInterval(timerInterval);

  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  finalScore.textContent = username + ", your score is " + score + "/" + quizData.length;
  timeTaken.textContent = "Time taken: " + time + " seconds";
}

// Restart
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  time = 0;
  username = "";

  clearInterval(timerInterval);

  // Clear input field
  document.getElementById("username").value = "";

  // Hide result, show start page
  resultBox.classList.add("hidden");
  quizBox.classList.add("hidden");
  startBox.classList.remove("hidden");

  // Clear UI text
  userDisplay.textContent = "";
  timerDisplay.textContent = "";
}
