// =====================
// Math Question Generator
// =====================
function generateRandomQuestion() {
  const questionType = Math.floor(Math.random() * 3); // Randomly choose type of question (0 = power/roots, 1 = algebra, 2 = angles)
  let question, answer, hint;

  // Power and Root questions
  if (questionType === 0) {
    const base = Math.floor(Math.random() * 9) + 1; // Random base between 1 and 9
    const exponent = Math.floor(Math.random() * 3) + 2; // Exponent between 2 and 4
    const root = Math.random() > 0.5; // Randomly choose between power or square root

    if (root) {
      // Square root question
      question = `What is the square root of ${base * base}?`;
      answer = base.toString();
      hint = `What number, when multiplied by itself, gives ${base * base}?`;
    } else {
      // Power question
      question = `What number is ${base} to the power of ${exponent}?`;
      answer = Math.pow(base, exponent).toString();
      hint = `Think about multiplying ${base} by itself ${exponent - 1} times.`;
    }

  }
  // Algebraic questions (solve for x)
  else if (questionType === 1) {
      const num1 = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9
      const num2 = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9
      const operation = Math.random();
      let operationSymbol, result;

      if (operation < 0.33) {
          // Addition
          operationSymbol = "+";
          question = `Solve for x: x + ${num1} = ${num2}`;
          result = num2 - num1;
      } else if (operation < 0.66) {
          // Subtraction
          operationSymbol = "-";
          question = `Solve for x: x - ${num1} = ${num2}`;
          result = num2 + num1;
      } else if (operation < 0.85) {
          // Multiplication
          operationSymbol = "*";
          question = `Solve for x: x * ${num1} = ${num2}`;
          result = num2 / num1;
          
          // Ensure result is an integer, by adjusting num2 to be a multiple of num1
          if (num2 % num1 !== 0) {
              num2 = num1 * (Math.floor(Math.random() * 9) + 1); // Make num2 a multiple of num1
              result = num2 / num1;
          }
      } else {
          // Division
          operationSymbol = "/";
          question = `Solve for x: x / ${num1} = ${num2}`;
          result = num2 * num1;
          
          // Ensure result is an integer by adjusting num2 to be a multiple of num1
          if (num2 % num1 !== 0) {
              num2 = num1 * (Math.floor(Math.random() * 9) + 1); // Make num2 a multiple of num1
              result = num2 / num1;
          }
      }

      answer = result.toString();
      hint = `Use the inverse operation of ${operationSymbol} to solve for x.`;
  }
  // Angle questions
  else if (questionType === 2) {
    const angle = Math.floor(Math.random() * 360); // Random angle between 0 and 360
    const classifyAngle = Math.random(); // Randomly decide to classify the angle or ask a specific question

    if (classifyAngle < 0.5) {
      // Classify angle
      question = `Classify the following angle: ${angle}°`;
      if (angle < 90) {
        answer = "Acute";
        hint = `Acute angles are smaller than 90°.`;
      } else if (angle === 90) {
        answer = "Right";
        hint = `Right angles are exactly 90°.`;
      } else if (angle < 180) {
        answer = "Obtuse";
        hint = `Obtuse angles are between 90° and 180°.`;
      } else if (angle < 360) {
        answer = "Reflex";
        hint = `Reflex angles are between 180° and 360°.`;
      } else {
        answer = "Straight";
        hint = `Straight angles are exactly 180°.`;
      }
    } else {
      // Specific angle question
      const angleType = Math.random();
      if (angleType < 0.33) {
        question = `What angle is less than 90°?`;
        answer = `${Math.floor(Math.random() * 89) + 1}°`;
        hint = `Angles less than 90° are acute angles.`;
      } else if (angleType < 0.66) {
        question = `What angle is equal to 90°?`;
        answer = "90°";
        hint = `A right angle is exactly 90°.`;
      } else {
        question = `What angle is greater than 90° but less than 180°?`;
        answer = `${Math.floor(Math.random() * 90) + 91}°`;
        hint = `Angles greater than 90° but less than 180° are obtuse angles.`;
      }
    }
  }

  return {
    question,
    answer,
    hint
  };
}

const { question, answer, hint } = generateRandomQuestion();
console.log(question);
console.log("Answer:", answer);
console.log("Hint:", hint);

// =====================
// Display Question
// =====================
function displayQuestion(data) {
  document.getElementById("question").textContent = data.question;
  document.getElementById("hint").textContent = data.hint;
  currentQuestion = data; // Store for validation
}

// =====================
// Player Summary Update
// =====================
function updateSummary() {
  summaryName.textContent = nameInput.value;
  summaryHero.textContent = heroSelect.options[heroSelect.selectedIndex].text;
  summaryDungeon.textContent = dungeonSelect.options[dungeonSelect.selectedIndex].text;
}

// =====================
// DOM Elements
// =====================
const nameInput = document.getElementById("playerName");
const heroSelect = document.getElementById("heroSelect");
const dungeonSelect = document.getElementById("dungeonSelect");
const summaryName = document.getElementById("summaryName");
const summaryHero = document.getElementById("summaryHero");
const summaryDungeon = document.getElementById("summaryDungeon");
const heroTitle = document.getElementById("heroTitle");

const adminBtn = document.getElementById("adminButton");
const loginPopup = document.getElementById("loginPopup");
const loginConfirmBtn = document.getElementById("loginConfirmBtn");
const loginCancelBtn = document.getElementById("loginCancelBtn");
const adminUsername = document.getElementById("adminUsername");
const adminPassword = document.getElementById("adminPassword");
const loginError = document.getElementById("loginError");

const startBtn = document.getElementById("startButton");
const gameModeDiv = document.getElementById("gameMode");
const quickPlayButton = document.getElementById("quickPlayButton");
const rankedButton = document.getElementById("rankedButton");
const mainMenu = document.getElementById("mainMenu");
const preferencesPage = document.getElementById("preferencesPage");
const startGameButton = document.getElementById("startGameButton");
const battlePage = document.getElementById("battlePage");

const submitAnswerButton = document.getElementById("submitAnswerButton");
const answerInput = document.getElementById("answerInput");

// Store the current question globally
let currentQuestion = null;

// =====================
// Event Listeners
// =====================

// Admin Login
adminBtn.addEventListener("click", () => {
  loginPopup.classList.remove("hidden");
});

loginCancelBtn.addEventListener("click", () => {
  loginPopup.classList.add("hidden");
  adminUsername.value = '';
  adminPassword.value = '';
  loginError.classList.add("hidden");
});

loginConfirmBtn.addEventListener("click", () => {
  const username = adminUsername.value.trim();
  const password = adminPassword.value;
  if (username === "admin" && password === "1234") {
    loginPopup.classList.add("hidden");
    showPage("overviewPage");
  } else {
    loginError.classList.remove("hidden");
  }
});

// Mode Selection
startBtn.addEventListener("click", () => {
  gameModeDiv.classList.remove("hidden");
});

quickPlayButton.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  preferencesPage.classList.remove("hidden");
  preferencesPage.setAttribute('data-mode', 'freeplay');
});

rankedButton.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  preferencesPage.classList.remove("hidden");
  preferencesPage.setAttribute('data-mode', 'ranked');
});

// Update Summary
nameInput.addEventListener("input", () => {
  heroTitle.textContent = nameInput.value || "[Name]";
});

dungeonSelect.addEventListener('click', () => {
  updateSummary();
});

// Start Game
startGameButton.addEventListener("click", () => {
  preferencesPage.classList.add("hidden");
  battlePage.classList.remove("hidden");

  const firstQuestion = generateMathQuestion();
  displayQuestion(firstQuestion);
});

// Submit Answer
submitAnswerButton.addEventListener("click", () => {
  if (!currentQuestion) return;

  const userAnswer = answerInput.value.trim();
  const correctAnswer = currentQuestion.answer.toString().trim();

  if (userAnswer === correctAnswer) {
    alert("Correct! Moving to the next question.");
    const nextQuestion = generateMathQuestion();
    displayQuestion(nextQuestion);
    answerInput.value = "";
  } else {
    alert("Incorrect. Try again!");
  }
});

const resultsPage = document.getElementById("resultsPage");
const finalScore = document.getElementById("finalScore");
const replayButton = document.getElementById("replayButton");
const returnToMenuButton = document.getElementById("returnToMenuButton");

const overviewPage = document.getElementById("overviewPage");
const leaderboardList = document.getElementById("leaderboardList");
const backToGameButton = document.getElementById("backToGameButton");

let playerScore = 0; // or however you track score

function showResults(score) {
  playerScore = score;
  finalScore.textContent = `Your Score: ${playerScore}`;
  battlePage.classList.add("hidden");
  resultsPage.classList.remove("hidden");
}

function showPage(pageId) {
  // Hide all pages
  const pages = [mainMenu, preferencesPage, battlePage, resultsPage, overviewPage, gameModeDiv];
  pages.forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

// replay function
replayButton.addEventListener("click", () => {
  playerScore = 0;
  resultsPage.classList.add("hidden");
  preferencesPage.classList.remove("hidden");
});

// Return to menu
returnToMenuButton.addEventListener("click", () => {
  showPage("mainMenu");
});

// Go back from overview page
backToGameButton.addEventListener("click", () => {
  showPage("mainMenu");
});

// function to update leaderboard
function updateLeaderboard(entries = []) {
  leaderboardList.innerHTML = ""; // clear old entries
  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} - ${entry.score} pts`;
    leaderboardList.appendChild(li);
  });
}

console.log("JavaScript loaded and running.");
