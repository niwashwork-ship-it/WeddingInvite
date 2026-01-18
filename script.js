/* COUNTDOWN */
const weddingDate = new Date("2026-02-20").getTime();
const countdownEl = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdownEl.innerText = days + " days to go";
}, 1000);

/* MUSIC */
const music = document.getElementById("bgMusic");
document.getElementById("musicBtn").onclick = () => {
  music.paused ? music.play() : music.pause();
};

/* DARK MODE */
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

/* PETALS */
const petals = document.getElementById("petals");
for (let i = 0; i < 20; i++) {
  const petal = document.createElement("span");
  petal.innerText = "🌸";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 5 + Math.random() * 5 + "s";
  petals.appendChild(petal);
}