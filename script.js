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
   AUTO SCROLL – ONE TIME, PREMIUM
===================================================== */

let autoScrollStarted = false;
let autoScrollInterval;
let currentSectionIndex = 0;

const autoSections = Array.from(document.querySelectorAll("section"));

function startAutoScroll() {
  if (autoScrollStarted || autoSections.length === 0) return;

  autoScrollStarted = true;

  autoScrollInterval = setInterval(() => {
    currentSectionIndex++;

    if (currentSectionIndex >= autoSections.length) {
      stopAutoScroll();
      return;
    }

    autoSections[currentSectionIndex].scrollIntoView({
      behavior: "smooth"
    });

  }, 4500); // 4.5 seconds per section (slow & elegant)
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Start auto-scroll after page load
window.addEventListener("load", () => {
  setTimeout(startAutoScroll, 2500);
});

// Stop auto-scroll on any user interaction
["wheel", "touchstart", "keydown"].forEach(event => {
  document.addEventListener(event, stopAutoScroll, { once: true });
});

