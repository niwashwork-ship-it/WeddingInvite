/* =====================================================
   GLOBAL VARIABLES
===================================================== */
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const bell = document.querySelector(".bell");
const flame = document.querySelector(".flame");

const flowerContainer = document.getElementById("flower-container");
const blessingSection = document.getElementById("blessing");

const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");
const musicHint = document.getElementById("music-hint");

let lastScrollTop = 0;
let musicStarted = false;

/* =====================================================
   NAVBAR AUTO HIDE ON SCROLL
===================================================== */
window.addEventListener("scroll", () => {
  if (!navbar) return;

  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

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
  if (!navbar) return;

  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

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
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* =====================================================
   BELL SWING ANIMATION
===================================================== */
window.addEventListener("scroll", () => {
  if (!bell || !blessingSection) return;

  if (window.scrollY <= blessingSection.offsetHeight) {
    const angle = Math.sin(window.scrollY / 40) * 15;
    bell.style.transform = `rotate(${angle}deg)`;
  } else {
    bell.style.transform = "rotate(0deg)";
  }
});

/* =====================================================
   DIYA FLAME FLICKER
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
   IMAGE FULLSCREEN SAFETY
===================================================== */
window.addEventListener("load", () => {
  const img = document.querySelector(".blessing-image");
  if (img) {
    img.style.width = "100%";
    img.style.height = "100vh";
    img.style.objectFit = "contain";
  }
});

/* =====================================================
   FLOWER SHOWER (PINK–LAVENDER, PREMIUM)
===================================================== */
const flowers = ["🌸","🌺"];

function createFlower() {
  if (!flowerContainer || !blessingSection) return;
  if (window.scrollY > blessingSection.offsetHeight) return;

  for (let i = 0; i < 1; i++) {
    const flower = document.createElement("span");
    flower.className = "flower";
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = "12s";

    flowerContainer.appendChild(flower);

    setTimeout(() => flower.remove(), 7000);
  }
}

setInterval(() => {
  try {
    createFlower();
  } catch (e) {
    console.warn("Flower skipped safely");
  }
}, 700);

/* =====================================================
   BACKGROUND MUSIC (MOBILE SAFE + BLINK)
===================================================== */
if (musicBtn && bgMusic) {
  bgMusic.volume = 0.10;
  musicBtn.classList.add("playing");

  musicBtn.addEventListener("click", () => {
    if (!musicStarted) {
      bgMusic.play().catch(() => {});
      musicStarted = true;
      musicBtn.classList.remove("playing");
      musicHint && (musicHint.style.display = "none");
    } else if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicBtn.classList.remove("playing");
      musicHint && (musicHint.style.display = "none");
    } else {
      bgMusic.pause();
      musicBtn.classList.add("playing");
      musicHint && (musicHint.style.display = "block");
    }
  });

  document.addEventListener(
    "click",
    () => {
      if (!musicStarted) {
        bgMusic.play().catch(() => {});
        musicStarted = true;
        musicBtn.classList.remove("playing");
        musicHint && (musicHint.style.display = "none");
      }
    },
    { once: true }
  );
}



/* =====================================================
   ULTRA GENTLE CONTINUOUS AUTO SCROLL (FINAL & STABLE)
===================================================== */

let autoScrollRunning = true;
let lastTime = null;

function gentleAutoScroll(time) {
  if (!autoScrollRunning) return;

  if (!lastTime) lastTime = time;
  const delta = time - lastTime;
  lastTime = time;

  const speed = 0.04; // very slow & premium

  // Stop at bottom
  if (
    window.innerHeight + window.scrollY >=
    document.body.scrollHeight - 5
  ) {
    autoScrollRunning = false;
    return;
  }

  window.scrollBy(0, delta * speed);
  requestAnimationFrame(gentleAutoScroll);
}

// Start after page load
window.addEventListener("load", () => {
  setTimeout(() => {
    requestAnimationFrame(gentleAutoScroll);
  }, 3000);
});

// ❗ STOP ONLY ON USER INTENT (desktop)
window.addEventListener("wheel", () => {
  autoScrollRunning = false;
}, { once: true });
