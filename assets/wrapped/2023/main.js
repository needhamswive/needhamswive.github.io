class Slide {
  name;
  element;
  hexElements = [];
  hexColors = [];

  constructor(name, element) {
    this.name = name;
    this.element = element;
  }

  nextHexColor() {
    return this.hexColors[Math.floor(Math.random() * this.hexColors.length)];
  }
}

const hexDesignDefinitions = {
  "welcome": {
    "colors": ["blue", "blue", "blue", "gold"],
    "corners": {
      "top left": [5, 3, 1],
      "bottom right": [7, 5, 1],
    }
  },
  "team-summary": {
    "colors": ["blue", "blue", "blue", "gold"],
    "corners": {
      "top right": [6, 5, 3, 1],
      "bottom left": [7, 5, 1],
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
  slides = Array
    .from(document.getElementsByClassName("slide"))
    .map(element => new Slide(element.dataset.name, element));
  activeSlide = document.getElementsByClassName("active")[0] || slides[0];
  activeSlide.element.classList.add("active");
  activeSlideIndex = slides.indexOf(activeSlide);
  setupNavigation();

  hexTemplate = document.getElementById("hex-template");
  setupHexDesigns();
  window.setInterval(animateHexes, 1000);
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
    nextSlide();
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
      slide.element.classList.add("active");
      activeSlideIndex += offset;
      activeSlide = slide;
    } else {
      slide.element.classList.remove("active");
    }
  });
  progressBarStartTime = Date.now();
}

function setupHexDesigns() {
  for (const [slideName, designDefinition] of Object.entries(hexDesignDefinitions)) {
    let slide = slides.filter(slide => slide.name === slideName)[0];

    if (!slide) {
      continue;
    }

    if (!designDefinition.corners) {
      continue;
    }

    slide.hexColors = designDefinition.colors;
    for (const [corner, rowCounts] of Object.entries(designDefinition.corners)) {
      const hexContainer = document.createElement("div");
      slide.element.appendChild(hexContainer);
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

        const hexes = Array(count).fill().map(_ => {
          const hex = hexTemplate.content.cloneNode(true);
          hex.children[0].dataset.color = slide.nextHexColor();
          return hex;
        });

        hexRow.append(...hexes);
        slide.hexElements.push(...Array.from(hexRow.querySelectorAll(".hex")));
      }
    }
  }
}

function animateHexes() {
  if (activeSlide.hexColors.length <= 1) {
    return;
  }

  const numberToChange = 1;
  const hexElementsToChange = getRandom(activeSlide.hexElements, numberToChange);

  for (const hexElement of hexElementsToChange) {
    while (true) {
      const nextColor = activeSlide.nextHexColor();
      if (nextColor === hexElement.dataset.color) {
        continue;
      }
      hexElement.dataset.color = nextColor;
      break;
    }
  }
}

// https://stackoverflow.com/a/19270021
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
