const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const buttons = document.querySelector(".buttons");

let dodgeCount = 0;
const MAX_DODGES = 7;

function dodgeNoButton() {
  if (dodgeCount >= MAX_DODGES) return;

  dodgeCount++;

  const containerRect = buttons.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 10;

  const maxX = containerRect.width - btnRect.width - padding;
  const maxY = containerRect.height - btnRect.height - padding;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  if (dodgeCount === 2) {
    hint.textContent = "Hmm… that’s weird 🤔";
  }

  if (dodgeCount === 4) {
    hint.textContent = "Why are you still trying? 😏";
    noBtn.style.transform += " scale(0.9)";
  }

  if (dodgeCount === 6) {
    hint.textContent = "Just say yes already 💖";
    noBtn.style.transform += " scale(0.8)";
  }

  if (dodgeCount >= MAX_DODGES) {
    noBtn.disabled = true;
    noBtn.style.opacity = "0.3";
    hint.textContent = "Okay okay… I give up 😭";
  }
}

// Works on BOTH desktop & mobile
noBtn.addEventListener("pointerenter", dodgeNoButton);
noBtn.addEventListener("pointerdown", dodgeNoButton);

yesBtn.addEventListener("click", () => {
  buttons.style.display = "none";
  hint.style.display = "none";
  result.classList.remove("hidden");
  launchConfetti();
});

function launchConfetti() {
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = "24px";
    heart.style.animation = "fall 2s linear";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

const style = document.createElement("style");
style.textContent = `
@keyframes fall {
  to {
    transform: translateY(110vh);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
