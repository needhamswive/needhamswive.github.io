const hexDesignDefinitions = {
  "welcome": {
    "colors": ["blue", "blue", "blue", "gold"],
    "corners": {
      "top left": [5, 3, 1],
      "bottom right": [7, 5, 1],
    }
  },
  "practice-summary": {
    "colors": ["white", "white", "gold", "gold", "gold"],
    "corners": {
      "top left": [2, 1],
      "top right": [4, 2, 1, 1],
      "bottom left": [7, 5, 1],
    }
  },
};

let progressBar;
let progressBarAnimation;
let progressBarStartTime;
let slides;
let activeSlide;
let activeSlideIndex;

let hexTemplate;

window.addEventListener("DOMContentLoaded", () => {
  progressBar = document.getElementsByClassName("progress")[0];
  progressBarStartTime = Date.now();
  slides = Array.from(document.getElementsByClassName("slide"));
  activeSlide = document.getElementsByClassName("active")[0] || slides[0];
  activeSlide.classList.add("active");
  activeSlideIndex = slides.indexOf(activeSlide);
  setupNavigation();

  hexTemplate = document.getElementById("hex-template");
  setupHexDesigns();
}, false);

function setupNavigation() {
  const backward = document.getElementById("backward");
  const forward = document.getElementById("forward");
  progressBarAnimation = progressBar.getAnimations()[0];

  backward.onclick = () => {
    previousSlide();
  };
  forward.onclick = () => {
    nextSlide();
  };
  progressBar.addEventListener("animationend", () => {
    // nextSlide();
  });
}

function resetTimer() {
  progressBar.classList.remove("progress");
  void progressBar.offsetWidth;
  progressBar.classList.add("progress");
  progressBarStartTime = Date.now();
}

function previousSlide() {
  const elapsedTime = Date.now() - progressBarStartTime;
  resetTimer();
  if (elapsedTime < 2000 && activeSlideIndex > 0) {
    offsetSlide(-1);
  }
}

function nextSlide() {
  if (activeSlideIndex + 1 < slides.length) {
    resetTimer();
    offsetSlide(1);
  }
}

function offsetSlide(offset) {
  const nextIndex = activeSlideIndex + offset;
  slides.forEach((slide, index) => {
    if (index == nextIndex) {
      slide.classList.add("active");
      activeSlideIndex += offset;
      activeSlide = slide;
    } else {
      slide.classList.remove("active");
    }
  });
  progressBarStartTime = Date.now();
}

function setupHexDesigns() {
  for (const [slideName, designDefinition] of Object.entries(hexDesignDefinitions)) {
    const slide = document.getElementsByClassName(`slide ${slideName}`)[0];

    if (!slide) {
      return;
    }

    const colors = designDefinition.colors;

    for (const [corner, rowCounts] of Object.entries(designDefinition.corners)) {
      const hexContainer = document.createElement("div");
      slide.appendChild(hexContainer);
      hexContainer.classList.add("hex-container");

      if (corner.includes("right")) {
        hexContainer.classList.add("right");
      }
      if (corner.includes("bottom")) {
        hexContainer.classList.add("bottom");
        rowCounts.reverse();
      }

      for (count of rowCounts) {
        const hexRow = document.createElement("div");
        hexRow.classList.add("hex-row");
        hexContainer.appendChild(hexRow);
        for (let i = 0; i < count; i++) {
          const hex = hexTemplate.content.cloneNode(true);
          const color = colors[Math.floor(Math.random() * colors.length)];
          hex.children[0].classList.add(color);
          hexRow.appendChild(hex);
        }
      }
    }
  }
}
