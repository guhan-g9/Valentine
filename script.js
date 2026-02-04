const COUNTDOWN_LOCKED = false;
const TARGET_DATE = new Date("2026-02-05T00:00:00");

/* Countdown */
const d=document;
const days=d.getElementById("days"),
hours=d.getElementById("hours"),
minutes=d.getElementById("minutes"),
seconds=d.getElementById("seconds"),
countdownScreen=d.getElementById("countdownScreen");

const screen1=d.getElementById("screen1"),
screen2=d.getElementById("screen2"),
screen3=d.getElementById("screen3"),
screen4=d.getElementById("screen4");

const yesBtn=d.getElementById("yesBtn"),
noBtn=d.getElementById("noBtn"),
hint=d.getElementById("hint"),
slider=d.getElementById("slider");

const steps=[...d.querySelectorAll(".step")];

function startExperience(){
  countdownScreen.classList.add("hidden");
  screen1.classList.remove("hidden");
}

function updateCountdown(){
  const diff=TARGET_DATE-new Date();
  if(diff<=0) return startExperience();
  days.textContent=Math.floor(diff/86400000);
  hours.textContent=Math.floor(diff/3600000)%24;
  minutes.textContent=Math.floor(diff/60000)%60;
  seconds.textContent=Math.floor(diff/1000)%60;
}

COUNTDOWN_LOCKED ? setInterval(updateCountdown,1000) : startExperience();

/* NO BUTTON ESCAPE */
let dodge=0;
function dodgeNo(){
  dodge++;
  const r=60+dodge*50;
  noBtn.style.transform=`translate(${(Math.random()-.5)*r}px,${(Math.random()-.5)*r}px)`;
}
noBtn.addEventListener("pointerenter",dodgeNo);
noBtn.addEventListener("pointerdown",dodgeNo);

/* FLOW */
yesBtn.onclick=()=>{screen1.classList.add("hidden");screen2.classList.remove("hidden");};

slider.oninput=()=>{
  slider.style.setProperty("--progress",`${slider.value}%`);
  if(slider.value>=100){
    screen2.classList.add("hidden");
    screen3.classList.remove("hidden");
    runLoaders();
  }
};

/* STEPWISE LOADERS */
function runLoaders(){
  let i=0;
  function next(){
    if(i>0) steps[i-1].classList.add("hidden");
    if(i===steps.length){
      screen3.classList.add("hidden");
      screen4.classList.remove("hidden");
      return;
    }
    steps[i].classList.remove("hidden");
    i++;
    setTimeout(next,1400);
  }
  next();
}
