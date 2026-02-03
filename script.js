const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const buttons = document.querySelector(".buttons");

let dodgeCount = 0;
const MAX_DODGES = 7;

noBtn.addEventListener("mouseenter", () => {
  if (dodgeCount >= MAX_DODGES) return;

  dodgeCount++;

  const containerRect = buttons.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  if (dodgeCount === 3) {
    hint.textContent = "Why is this so hard to click? 🤔";
  }

  if (dodgeCount === 5) {
    noBtn.style.transform += " scale(0.8)";
    hint.textContent = "At this point… just say yes 😌";
  }

  if (dodgeCount >= MAX_DODGES) {
    noBtn.style.opacity = "0.3";
    noBtn.disabled = true;
    hint.textContent = "Okay okay… I give up 😭";
  }
});

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
    const confetti = document.createElement("div");
    confetti.textContent = "💖";
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-20px";
    confetti.style.fontSize = "24px";
    confetti.style.animation = "fall 2s linear";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);

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
