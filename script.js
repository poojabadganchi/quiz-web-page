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
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "4. Who wrote the National Anthem of India?",
    options: ["Mahatma Gandhi", "Rabindranath Tagore", "Jawaharlal Nehru", "Subhas Chandra Bose"],
    answer: "Rabindranath Tagore"
  }
];

let currentQuestion = 0;
let score = 0;

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalScore = document.getElementById("final-score");

function loadQuestion() {
  nextBtn.disabled = true;
  options.innerHTML = "";

  const currentQuiz = quizData[currentQuestion];
  question.textContent = currentQuiz.question;
  progress.textContent = "Question " + (currentQuestion + 1) + " of " + quizData.length;

  currentQuiz.options.forEach(function(option) {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");

    button.onclick = function() {
      checkAnswer(button, option);
    };

    options.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedOption) {
  const correctAnswer = quizData[currentQuestion].answer;
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(function(button) {
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

nextBtn.addEventListener("click", function() {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  finalScore.textContent = "Your Score: " + score + " / " + quizData.length;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}
loadQuestion();
