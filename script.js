// COUNTDOWN
const weddingDate = new Date("2026-02-20").getTime();
const countdown = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.innerText = days + " days to go";
}, 1000);

let lastScroll = 0;
const navbar = document.querySelector(".navbar");
const bell = document.querySelector(".bell");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  /* AUTO HIDE NAVBAR */
  if (currentScroll > lastScroll && currentScroll > 80) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }
  lastScroll = currentScroll;

  /* NAVBAR COLOR CHANGE */
  if (currentScroll < window.innerHeight) {
    navbar.className = "navbar pink";
  } else if (currentScroll < window.innerHeight * 2) {
    navbar.className = "navbar lavender";
  } else {
    navbar.className = "navbar light";
  }

  /* BELL SYNC WITH SCROLL */
  if (bell && currentScroll < window.innerHeight) {
    bell.style.transform = `rotate(${Math.sin(currentScroll / 40) * 12}deg)`;
  }
});