const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

let questions = []


const timePerQuestion = 30;
const num = 10; // Default number of questions
const cat = ""; // Default category (any)
const diff = ""; // Default difficulty (any)
let score = 0;
let  timer;
const startQuiz = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get('quiz_id') || 1; // Default to quiz_id=1 if not provided
  console.log("🚀 ~ startQuiz ~ quizId:", quizId)
  loadingAnimation();
  const url = `http://localhost:3000/getQuestions?quizId=${quizId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched Data:", data);
      questions = data;
      setTimeout(() => {
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        currentQuestion = 1;
        showQuestion(questions[0]);
      }, 1000);
    });
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;
  const answers = [...question.incorrect_answers, ...question.correct_answers];
  console.log("🚀 ~ showQuestion ~ answers:", answers)

  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
  <span class="total">/${questions.length}</span>`;

  const answersDiv = document.querySelectorAll(".answer");
  const correctAnswers = question.correct_answers;
  
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      answer.classList.toggle("selected");
      submitBtn.disabled = false;
    });
  });
  
  time = timePerQuestion;
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      progress(time);
      time--;
      playAudio("countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};

function defineProperty() {
  var osccred = document.createElement("div");
  osccred.innerHTML =
    "A Project By <a href='https://www.youtube.com/@opensourcecoding' target=_blank>Open Source Coding</a>";
  osccred.style.position = "absolute";
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
}

defineProperty();

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get('quiz_id') || 1; // Default to quiz_id=1 if not provided

  const fetchUrl = `http://localhost:3000/getQuizDetails?quiz_id=${quizId}`;
  console.log('Fetching details from URL:', fetchUrl);

  fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
          console.log('Fetched Data:', data);
          document.title = data.quiz_name; // Update the document title
          document.querySelectorAll('.heading').forEach(element => {
              element.textContent = data.quiz_name; // Update all elements with class 'heading'
          });
          document.querySelectorAll('.description').forEach(element => {
              element.textContent = data.description; // Update all elements with class 'description'
          });
      })
      .catch(error => {
          console.error('Error fetching quiz details:', error);
      });
});




nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswers = document.querySelectorAll(".answer.selected");
  const selectedAnswerTexts = Array.from(selectedAnswers).map(
    (answer) => answer.querySelector(".text").innerHTML
  );

  const correctAnswers = questions[currentQuestion - 1].correct_answers;

  // Check if the selected answers are correct
  const isCorrect =
    correctAnswers.length === selectedAnswerTexts.length &&
    correctAnswers.every((answer) => selectedAnswerTexts.includes(answer));

  if (isCorrect) {
    score++;
    selectedAnswers.forEach((answer) => {
      answer.classList.add("correct");
    });
  } else {
    selectedAnswers.forEach((answer) => {
      if (correctAnswers.includes(answer.querySelector(".text").innerHTML)) {
        answer.classList.add("correct");
      } else {
        answer.classList.add("wrong");
      }
    });
    document.querySelectorAll(".answer").forEach((answerElement) => {
      if (correctAnswers.includes(answerElement.querySelector(".text").innerHTML) && !answerElement.classList.contains("selected")) {
        answerElement.classList.add("correct");
      }
    });
  }

  document.querySelectorAll(".answer").forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};


const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const showScore = () => {
  quiz.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");
