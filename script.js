/* Scroll reveal */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

/* Countdown */
const weddingDate = new Date("February 14, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("countdown").innerText =
    days > 0 ? `⏳ ${days} days to go` : "🎉 Wedding Day!";
}, 1000);