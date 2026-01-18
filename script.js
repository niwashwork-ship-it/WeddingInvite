// COUNTDOWN
const weddingDate = new Date("2026-02-20").getTime();
const countdown = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.innerText = days + " days to go";
}, 1000);