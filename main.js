// =====================
// Utility Functions
// =====================
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =====================
// Math Question Generator
// =====================
function generateRandomQuestion(questionType) {
  let question = "", answer = "", hint = "";

  switch (questionType) {
    case 1: // Power and Root
      const base = getRandomInt(1, 9);
      const exponent = getRandomInt(2, 3);
      if (Math.random() > 0.5) {
        question = `What is the square root of ${base * base}?`;
        answer = `${base}`;
        hint = `What number, when multiplied by itself, gives ${base * base}?`;
      } else {
        question = `What number is ${base} to the power of ${exponent}?`;
        answer = `${Math.pow(base, exponent)}`;
        hint = `Think about multiplying ${base} by itself ${exponent} times.`;
      }
      break;

    case 2: // Algebraic solve for x
      let num1 = getRandomInt(1, 9);
      let num2 = getRandomInt(1, 9);
      const operation = Math.random();

      if (operation < 0.33) {
        question = `Solve for x: x + ${num1} = ${num2}`;
        answer = `${num2 - num1}`;
        hint = `Use the inverse operation of + to solve for x.`;
      } else if (operation < 0.66) {
        question = `Solve for x: x - ${num1} = ${num2}`;
        answer = `${num2 + num1}`;
        hint = `Use the inverse operation of - to solve for x.`;
      } else if (operation < 0.85) {
        num2 = num1 * getRandomInt(1, 9);
        question = `Solve for x: x * ${num1} = ${num2}`;
        answer = `${num2 / num1}`;
        hint = `Use the inverse operation of * to solve for x.`;
      } else {
        let x = getRandomInt(1, 9);
        num2 = getRandomInt(1, 9);
        question = `Solve for x: x / ${num2} = ${x}`;
        answer = `${x * num2}`;
        hint = `Use the inverse operation of / to solve for x.`;
      }
      break;

    case 3: // Angles
      const angle = getRandomInt(0, 359);
      if (Math.random() < 0.5) {
        question = `Classify the following angle: ${angle}°`;
        if (angle < 90) {
          answer = "Acute";
          hint = `These angles are smaller than 90°.`;
        } else if (angle === 90) {
          answer = "Right";
          hint = `This angle is exactly 90°.`;
        } else if (angle < 180) {
          answer = "Obtuse";
          hint = `These angles are between 90° and 180°.`;
        } else if (angle === 180) {
          answer = "Straight";
          hint = `This angle is exactly 180°.`;
        } else {
          answer = "Reflex";
          hint = `These angles are between 180° and 360°.`;
        }
      } else {
        const type = Math.random();
        if (type < 0.33) {
          answer = `${getRandomInt(1, 89)}°`;
          question = `What angle is less than 90°?`;
          hint = `Angles less than 90° are acute angles.`;
        } else if (type < 0.66) {
          answer = "90°";
          question = `What angle is equal to 90°?`;
          hint = `A right angle is exactly 90°.`;
        } else {
          answer = `${getRandomInt(91, 179)}°`;
          question = `What angle is greater than 90° but less than 180°?`;
          hint = `Angles greater than 90° but less than 180° are obtuse angles.`;
        }
      }
      break;
  }

  return { question, answer, hint };
}

// =====================
// Display & Summary
// =====================
function displayQuestion(data) {
  document.getElementById("question").textContent = data.question;
  document.getElementById("hint").textContent = data.hint;
  currentQuestion = data;
}

function updateSummary() {
  summaryName.textContent = playerName.value;
  summaryHero.textContent = heroSelect.options[heroSelect.selectedIndex].text;
  summaryDungeon.textContent = dungeonSelect.options[dungeonSelect.selectedIndex].text;
}

function preventSelectChange(selectElement) {
  selectElement.addEventListener("mousedown", (e) => {
    if (selectElement.classList.contains("locked")) e.preventDefault();
  });
}

// =====================
// DOM Elements
// =====================
const $ = (id) => document.getElementById(id);
const [
  adminBtn, loginPopup, loginConfirmBtn, loginCancelBtn, loginError,
  startBtn, startCancelBtn, gameModePopup, quickPlayButton, rankedButton,
  mainMenu, preferencesPage, startGameButton, battlePage,
  playerName, heroSelect, dungeonSelect, summaryName, summaryHero, summaryDungeon, heroTitle,
  confirmName, confirmHero, confirmDungeon, reselectPreferences,
  nameEnterBox, heroSelectBox, dungeonSelectBox, summaryBox,
  submitAnswerButton, answerInput,
  resultsPage, finalScore, replayButton, returnToMenuButton,
  overviewPage, leaderboardList, backToGameButton
] = [
  "adminButton", "loginPopup", "loginConfirmBtn", "loginCancelBtn", "loginError",
  "startButton", "startCancelBtn", "gameModePopup", "quickPlayButton", "rankedButton",
  "mainMenu", "preferencesPage", "startGameButton", "battlePage",
  "playerName", "heroSelect", "dungeonSelect", "summaryName", "summaryHero", "summaryDungeon", "heroTitle",
  "confirmName", "confirmHero", "confirmDungeon", "reselectPreferences",
  "nameEnterBox", "heroSelectBox", "dungeonSelectBox", "summaryBox",
  "submitAnswerButton", "answerInput",
  "resultsPage", "finalScore", "replayButton", "returnToMenuButton",
  "overviewPage", "leaderboardList", "backToGameButton"
].map($);

// =====================
// Game State
// =====================
let currentQuestion = null;
let questionType;
let round = 0;
let playerScore = 0;

// =====================
// Event Listeners
// =====================

// Admin
adminBtn.addEventListener("click", () => {
  loginPopup.classList.remove("hidden");
  startBtn.classList.add("hidden");
  adminBtn.classList.add("hidden");
});

loginCancelBtn.addEventListener("click", () => {
  loginPopup.classList.add("hidden");
  adminUsername.value = '';
  adminPassword.value = '';
  loginError.classList.add("hidden");
  startBtn.classList.remove("hidden");
  adminBtn.classList.remove("hidden");
});

loginConfirmBtn.addEventListener("click", () => {
  const username = adminUsername.value.trim();
  const password = adminPassword.value;
  if (username === "admin" && password === "1234") {
    loginPopup.classList.add("hidden");
    startBtn.classList.remove("hidden");
    adminBtn.classList.remove("hidden");
    showPage("overviewPage");
  } else {
    loginError.classList.remove("hidden");
  }
});

// Game Mode
startBtn.addEventListener("click", () => {
  gameModePopup.classList.remove("hidden");
  startBtn.classList.add("hidden");
  adminBtn.classList.add("hidden");
});

[startCancelBtn, quickPlayButton, rankedButton].forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (btn === startCancelBtn) {
      gameModePopup.classList.add("hidden");
    } else {
      mainMenu.classList.add("hidden");
      preferencesPage.classList.remove("hidden");
      preferencesPage.setAttribute('data-mode', i === 1 ? 'freeplay' : 'ranked');
    }
    startBtn.classList.remove("hidden");
    adminBtn.classList.remove("hidden");
  });
});

// Preferences
confirmName.addEventListener("click", () => {
  if (playerName.value === "") return alert("Please enter your name before continuing.");
  confirmName.classList.add("hidden");
  heroSelectBox.classList.remove("hidden");
  heroTitle.textContent = playerName.value;
  playerName.readOnly = true;
});

confirmHero.addEventListener("click", () => {
  if (!heroSelect.value) return alert("Please select a hero before continuing.");
  confirmHero.classList.add("hidden");
  dungeonSelectBox.classList.remove("hidden");
  heroSelect.classList.add("locked");
  preventSelectChange(heroSelect);
});

confirmDungeon.addEventListener("click", () => {
  if (!dungeonSelect.value) return alert("Please select a dungeon before continuing.");
  confirmDungeon.classList.add("hidden");
  summaryBox.classList.remove("hidden");
  questionType = parseInt(dungeonSelect.value);
  dungeonSelect.classList.add("locked");
  preventSelectChange(dungeonSelect);
  updateSummary();
});

reselectPreferences.addEventListener("click", () => {
  [summaryBox, heroSelectBox, dungeonSelectBox].forEach(e => e.classList.add("hidden"));
  [confirmName, confirmHero, confirmDungeon].forEach(e => e.classList.remove("hidden"));
  playerName.readOnly = false;
  heroSelect.classList.remove("locked");
  dungeonSelect.classList.remove("locked");
});

// Game Start
startGameButton.addEventListener("click", () => {
  showPage("battlePage");
  currentQuestion = generateRandomQuestion(questionType);
  displayQuestion(currentQuestion);
});

// Answer Submission
submitAnswerButton.addEventListener("click", () => {
  if (!currentQuestion) return;

  const userAnswer = answerInput.value.trim();
  const correctAnswer = currentQuestion.answer.trim();

  if (userAnswer === correctAnswer) {
    alert("Correct! Moving to the next question.");
    playerScore++;
  } else {
    alert("Incorrect. Try again!");
  }

  answerInput.value = "";
  round++;

  if (round < 3) {
    currentQuestion = generateRandomQuestion(questionType);
    displayQuestion(currentQuestion);
  } else {
    showResults(playerScore);
  }
});

// =====================
// Result Handling
// =====================
function showResults(score) {
  finalScore.textContent = `Your Score: ${score}`;
  showPage("resultsPage");
  round = 0;
  playerScore = 0;
  answerInput.value = "";
}

function showPage(pageId) {
  const pages = [mainMenu, preferencesPage, battlePage, resultsPage, overviewPage, gameModePopup];
  pages.forEach(p => p.classList.add("hidden"));
  $(pageId).classList.remove("hidden");
}

replayButton.addEventListener("click", () => showPage("preferencesPage"));
returnToMenuButton.addEventListener("click", () => showPage("mainMenu"));
backToGameButton.addEventListener("click", () => showPage("mainMenu"));

// =====================
// Leaderboard
// =====================
function updateLeaderboard(entries = []) {
  leaderboardList.innerHTML = "";
  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} - ${entry.score} pts`;
    leaderboardList.appendChild(li);
  });
}

console.log("JavaScript loaded and running.");
