/* =====================================================
   GLOBAL VARIABLES
===================================================== */
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const bell = document.querySelector(".bell");
const flame = document.querySelector(".flame");

let lastScrollTop = 0;

/* =====================================================
   NAVBAR AUTO HIDE ON SCROLL
===================================================== */
window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // Hide navbar on scroll down, show on scroll up
  if (currentScroll > lastScrollTop && currentScroll > 80) {
    navbar.style.top = "-80px";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = currentScroll;
});

/* =====================================================
   NAVBAR COLOR CHANGE PER SECTION
===================================================== */
window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  if (!navbar) return;

  switch (currentSection) {
    case "blessing":
      navbar.style.background = "rgba(255,220,235,0.95)";
      break;
    case "home":
      navbar.style.background = "rgba(245,230,255,0.95)";
      break;
    case "invitation":
      navbar.style.background = "rgba(255,240,245,0.95)";
      break;
    case "venue":
      navbar.style.background = "rgba(240,210,225,0.95)";
      break;
    default:
      navbar.style.background = "rgba(255,230,240,0.9)";
  }
});

/* =====================================================
   SMOOTH SCROLL FOR NAV LINKS
===================================================== */
document.querySelectorAll("#navbar a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

/* =====================================================
   BELL SWING ANIMATION (SCROLL SYNC)
===================================================== */
window.addEventListener("scroll", () => {
  if (!bell) return;

  // Bell swings only in blessing section
  const blessing = document.getElementById("blessing");
  if (!blessing) return;

  const blessingHeight = blessing.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY <= blessingHeight) {
    const angle = Math.sin(scrollY / 40) * 15;
    bell.style.transform = `rotate(${angle}deg)`;
  } else {
    bell.style.transform = "rotate(0deg)";
  }
});

/* =====================================================
   DIYA FLAME FLICKER (NATURAL EFFECT)
===================================================== */
if (flame) {
  setInterval(() => {
    const scale = 1 + Math.random() * 0.08;
    const rotate = (Math.random() - 0.5) * 8;
    flame.style.transform =
      `translateX(-50%) scale(${scale}) rotate(${rotate}deg)`;
    flame.style.opacity = 0.75 + Math.random() * 0.25;
  }, 180);
}

/* =====================================================
   SAFETY: IMAGE FULLSCREEN FIX ON LOAD
===================================================== */
window.addEventListener("load", () => {
  const img = document.querySelector(".blessing-image");
  if (img) {
    img.style.width = "100%";
    img.style.height = "100vh";
    img.style.objectFit = "contain"; // ensures 


/* =====================================================
   MULTI-FLOWER | SINGLE COLOR | PREMIUM
===================================================== */

const flowers = ["🌸", "🌺", "🌹", "🌼"]; // multiple shapes

function createFlower() {
  if (!flowerContainer || !blessingSection) return;

  // Stop flowers after blessing section
  if (window.scrollY > blessingSection.offsetHeight) return;

  // Two flowers per cycle (rich but smooth)
  for (let i = 0; i < 2; i++) {
    const flower = document.createElement("span");
    flower.classList.add("flower");

    // Random flower shape ONLY
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = "6s"; // SAME SPEED

    flowerContainer.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 7000);
  }
}

// Premium density
setInterval(createFlower, 300);

/* =====================================================
   BACKGROUND MUSIC (MOBILE SAFE + ATTENTION BLINK)
===================================================== */

const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");
const musicHint = document.getElementById("music-hint");

let musicStarted = false;

// Set soft volume
bgMusic.volume = 0.10;

// Start with blinking to attract attention
musicBtn.classList.add("playing");

// Start / toggle music on button click
musicBtn.addEventListener("click", () => {
  if (!musicStarted) {
    bgMusic.play().catch(() => {});
    musicStarted = true;

    // Stop blinking + hide hint after first click
    musicBtn.classList.remove("playing");
    musicHint.style.display = "none";
  } else {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicBtn.classList.remove("playing");
      musicHint.style.display = "none";
    } else {
      bgMusic.pause();

      // Resume blinking + hint if paused
      musicBtn.classList.add("playing");
      musicHint.style.display = "block";
    }
  }
});

// OPTIONAL: start music on first user tap anywhere (mobile support)
document.addEventListener(
  "click",
  () => {
    if (!musicStarted) {
      bgMusic.play().catch(() => {});
      musicStarted = true;
      musicBtn.classList.remove("playing");
      musicHint.style.display = "none";
    }
  },
  { once: true }
);
