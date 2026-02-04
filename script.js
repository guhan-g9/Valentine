/********************************
 * CONFIG
 ********************************/
const COUNTDOWN_LOCKED = true; // false for testing
const TARGET_DATE = new Date("2026-02-04T23:07:00");

/********************************
 * DARE MESSAGES (MUST BE FIRST)
 ***********************************/
const dareMessages = [
  "😈 Dare you to click “No”… if you can.",
  "Hmm… still trying? Bold choice 😏",
  "Okay now you’re just curious 👀",
  "You’re really testing fate today 😌",
  "At this point, I admire the effort 😂",
  "Alright… you win the stubborn award 🏆"
];

/********************************
 * ELEMENT REFERENCES
 ********************************/
const d = document;

// Countdown
const countdownScreen = d.getElementById("countdownScreen");
const daysEl = d.getElementById("days");
const hoursEl = d.getElementById("hours");
const minutesEl = d.getElementById("minutes");
const secondsEl = d.getElementById("seconds");

// Screens
const screen1 = d.getElementById("screen1");
const screen2 = d.getElementById("screen2");
const screen3 = d.getElementById("screen3");
const screen4 = d.getElementById("screen4");

// Controls
const yesBtn = d.getElementById("yesBtn");
const noBtn = d.getElementById("noBtn");
const hint = d.getElementById("hint");
const slider = d.getElementById("slider");

// Dare modal
const dareModal = d.getElementById("dareModal");
const closeModalBtn = d.getElementById("closeModal");
const dareText = d.getElementById("dareText");

// Fake loading steps
const loaderSteps = [...d.querySelectorAll(".step")];

/********************************
 * STATE FLAGS
 ********************************/
let experienceStarted = false;
let questionActive = false;
let noAttempts = 0;

/********************************
 * INITIAL STATE
 ********************************/
dareModal.style.display = "none";

/********************************
 * COUNTDOWN LOGIC
 ********************************/
function startExperience() {
  experienceStarted = true;
  questionActive = true;

  countdownScreen.classList.add("hidden");
  screen1.classList.remove("hidden");

  showDareModal();
}

function updateCountdown() {
  const diff = TARGET_DATE - new Date();

  if (diff <= 0) {
    startExperience();
    clearInterval(countdownInterval);
    return;
  }

  daysEl.textContent = Math.floor(diff / 86400000);
  hoursEl.textContent = Math.floor(diff / 3600000) % 24;
  minutesEl.textContent = Math.floor(diff / 60000) % 60;
  secondsEl.textContent = Math.floor(diff / 1000) % 60;
}

let countdownInterval;
if (COUNTDOWN_LOCKED) {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
} else {
  startExperience();
}

/********************************
 * DARE MODAL LOGIC (TDZ SAFE)
 ********************************/
function showDareModal() {
  if (!experienceStarted || !questionActive) return;

  dareText.textContent =
    dareMessages[Math.min(noAttempts, dareMessages.length - 1)];

  dareModal.style.display = "flex";
}

// Close ONLY via ❌
closeModalBtn.addEventListener("click", () => {
  dareModal.style.display = "none";
});

/********************************
 * NO BUTTON ESCAPE
 ********************************/
function dodgeNo() {
  if (!questionActive) return;

  noAttempts++;

  // 🔥 Always re-show modal on No attempt
  showDareModal();

  const container = noBtn.parentElement;
  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxOffset = 40 + noAttempts * 30;

  let x = (Math.random() - 0.5) * maxOffset * 2;
  let y = (Math.random() - 0.5) * maxOffset;

  // Clamp to container
  const minX = containerRect.left - btnRect.left + 8;
  const maxX = containerRect.right - btnRect.right - 8;
  const minY = containerRect.top - btnRect.top + 8;
  const maxY = containerRect.bottom - btnRect.bottom - 8;

  x = Math.max(minX, Math.min(x, maxX));
  y = Math.max(minY, Math.min(y, maxY));

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  if (noAttempts === 3) hint.textContent = "";
  if (noAttempts === 6) hint.textContent = "";
}

noBtn.addEventListener("pointerenter", dodgeNo);
noBtn.addEventListener("pointerdown", dodgeNo);

/********************************
 * CONFETTI EFFECT
 ********************************/
function launchConfetti() {
  const colors = ["#ff2e63", "#ffb703", "#ffffff", "#ffd6e0"];

  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration =
      2 + Math.random() * 2 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

/********************************
 * YES → SLIDER FLOW
 ********************************/
yesBtn.addEventListener("click", () => {
  questionActive = false;

  dareModal.style.display = "none";

  launchConfetti(); // 🎉 CONFETTI HERE

  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");
});


/********************************
 * SLIDER PROGRESS
 ********************************/
slider.addEventListener("input", () => {
  slider.style.setProperty("--progress", `${slider.value}%`);

  if (slider.value >= 100) {
    screen2.classList.add("hidden");
    screen3.classList.remove("hidden");
    runFakeLoading();
  }
});

/********************************
 * HEART CONFETTI (FINAL SCREEN)
 ********************************/
function launchHeartConfetti() {
  for (let i = 0; i < 80; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart-confetti");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 3 + Math.random() * 2 + "s";
    heart.style.opacity = 0.7 + Math.random() * 0.3;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }
}



/********************************
 * FAKE LOADING SEQUENCE
 ********************************/
function runFakeLoading() {
  let index = 0;

  function next() {
    if (index > 0) loaderSteps[index - 1].classList.add("hidden");

    if (index >= loaderSteps.length) {
      screen3.classList.add("hidden");
      screen4.classList.remove("hidden");
      launchHeartConfetti();
      return;
    }

    loaderSteps[index].classList.remove("hidden");
    index++;

    setTimeout(next, 1400);
  }

  next();
}
