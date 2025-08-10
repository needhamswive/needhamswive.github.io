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
    return this.hexColors[Math.floor(random() * this.hexColors.length)];
  }
}

const HEX_DESIGN_DEFINITIONS = [
  {
    slideNames: ["welcome"],
    colors: ["blue", "blue", "blue", "gold"],
    corners: {
      "top left": [1],
      "top right": [1],
      "bottom left": [3, 1],
      "bottom right": [3, 1],
    },
  },
  {
    slideNames: ["team-summary"],
    colors: ["blue", "blue", "blue", "gold"],
    corners: {
      "top left": [2, 1],
      "top right": [3, 1],
      "bottom left": [5, 3],
    },
  },
  {
    slideNames: ["dual-meet-scores"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [3, 1],
      "top right": [1],
      "bottom right": [5, 1],
    },
  },
  {
    slideNames: ["championships-summary"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [3, 1],
      "top right": [3, 1],
      "bottom left": [3, 1],
      "bottom right": [3, 1],
    },
  },
  {
    slideNames: ["transition-1", "transition-2"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [3, 1, 1],
      "top right": [2, 1],
      "bottom left": [1],
      "bottom right": [5, 3, 1],
    },
  },
  {
    slideNames: ["goodbye", "goodbye-senior", "previous-wrapped", "champion-events"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [2, 1],
      "top right": [2, 1],
      "bottom left": [2, 1],
      "bottom right": [2, 1],
    },
  },
  {
    slideNames: ["season-best"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [5, 3, 1],
      "top right": [1],
      "bottom left": [3, 1],
      "bottom right": [2, 1],
    },
  },
  {
    slideNames: ["25-butterfly-times", "50-butterfly-times"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [3, 1],
    },
  },
  {
    slideNames: ["25-freestyle-times", "50-freestyle-times"],
    colors: ["blue", "gold"],
    corners: {
      "top right": [3, 1],
    },
  },
  {
    slideNames: ["25-breaststroke-times", "50-breaststroke-times"],
    colors: ["blue", "gold"],
    corners: {
      "bottom right": [3, 1],
    },
  },
  {
    slideNames: ["25-backstroke-times", "50-backstroke-times"],
    colors: ["blue", "gold"],
    corners: {
      "bottom left": [3, 1],
    },
  },
  {
    slideNames: ["paper-plate"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [2, 1],
      "top right": [2, 1],
      "bottom right": [2, 1],
    },
  },
  {
    slideNames: ["swimmer-of-the-week"],
    colors: ["blue", "gold"],
    corners: {
      "top right": [2, 1],
      "bottom left": [2, 1],
      "bottom right": [2, 1],
    },
  },
  {
    slideNames: ["golden-goggle"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [2, 1],
      "bottom left": [2, 1],
      "bottom right": [2, 1],
    },
  },
];

let meters = [];
let activeProgressBar;
let progressBarAnimation;
let progressBarStartTime;
let slides;
let activeSlide;
let activeSlideIndex;

let hexTemplate;

const swimmerName = new URLSearchParams(window.location.search).get("swimmer");

console.log(swimmerName);
const swimmerPath =
  window.location.origin +
  `/assets/sharks/season-wrapped/2025/swimmers/${swimmerName}.json`;
const swimmerRequest = fetch(swimmerPath);

let random = mulberry32(cyrb128(swimmerName)[0]);

window.addEventListener(
  "DOMContentLoaded",
  async () => {
    slides = Array.from(document.querySelectorAll(".slide")).map(
      (element) => new Slide(element.dataset.name, element)
    );
    activeSlide =
      slides.filter((slide) => slide.element.classList.contains("active"))[0] ||
      slides[0];
    activeSlide.element.classList.add("active");

    hexTemplate = document.getElementById("hex-template");
    setupHexDesigns();

    const swimmerResponse = await swimmerRequest;

    if (swimmerResponse.status === 404) {
      slides = slides.slice(0, 1);
      return;
    }

    const swimmer = await swimmerResponse.json();
    preprocessSwimmer(swimmer);
    processSwimmer(swimmer);
    activeSlideIndex = slides.indexOf(activeSlide);
    setupProgressBar();
    setupNavigation();
  },
  false
);

function setupProgressBar() {
  const meterContainer = document.getElementsByClassName("meters-container")[0];

  for (let i = 0; i < slides.length; i++) {
    const meter = document.createElement("div");
    meterContainer.appendChild(meter);
    meter.classList.add("meter");

    const progressBar = document.createElement("span");
    meter.appendChild(progressBar);
    if (i < activeSlideIndex) {
      progressBar.classList.add("progress-done");
    } else if (i == activeSlideIndex) {
      progressBar.classList.add("progress-active");
    }

    progressBar.addEventListener("animationend", () => {
      nextSlide();
    });

    meters.push(meter);
  }

  activeProgressBar = document.querySelector(".progress-active");
  progressBarStartTime = Date.now();
}

function setupNavigation() {
  const backward = document.getElementById("backward");
  const forward = document.getElementById("forward");
  progressBarAnimation = activeProgressBar.getAnimations()[0];

  backward.onclick = () => {
    previousSlide();
  };
  forward.onclick = () => {
    nextSlide();
  };
}

function previousSlide() {
  const elapsedTime = Date.now() - progressBarStartTime;
  if (elapsedTime < 2000 && activeSlideIndex > 0) {
    offsetSlide(-1);
  }
  resetTimer();
}

function nextSlide() {
  if (activeSlideIndex + 1 < slides.length) {
    offsetSlide(1);
    resetTimer();
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

function resetTimer() {
  activeProgressBar.classList.remove("progress-active");
  void activeProgressBar.offsetWidth;

  const meters = document.getElementsByClassName("meter");
  for (let i = 0; i < slides.length; i++) {
    const progressBar = meters[i].querySelector("span")
    if (i < activeSlideIndex) {
      progressBar.classList.remove("progress-active");
      progressBar.classList.add("progress-done");
    } else if (i == activeSlideIndex) {
      progressBar.classList.add("progress-active");
      activeProgressBar = progressBar;
    } else {
      progressBar.classList.remove("progress-active");
      progressBar.classList.remove("progress-done");
    }
  }

  progressBarStartTime = Date.now();
}

function setupHexDesigns() {
  for (const designDefinition of HEX_DESIGN_DEFINITIONS) {
    for (const slideName of designDefinition.slideNames) {
      let slide = slides.filter((slide) => slide.name === slideName)[0];

      if (!slide) {
        continue;
      }

      if (!designDefinition.corners) {
        continue;
      }

      slide.hexColors = designDefinition.colors;
      for (let [corner, rowCounts] of Object.entries(
        designDefinition.corners
      )) {
        const hexContainer = document.createElement("div");
        slide.element.appendChild(hexContainer);
        hexContainer.classList.add("hex-container");

        if (corner.includes("right")) {
          hexContainer.classList.add("right");
        }
        if (corner.includes("bottom")) {
          hexContainer.classList.add("bottom");
          rowCounts = rowCounts.slice().reverse();
        }

        for (count of rowCounts) {
          const hexRow = document.createElement("div");
          hexRow.classList.add("hex-row");
          hexContainer.appendChild(hexRow);

          const hexes = Array(count)
            .fill()
            .map((_) => {
              const hex = hexTemplate.content.cloneNode(true);
              hex.children[0].dataset.color = slide.nextHexColor();
              return hex;
            });

          hexRow.append(...hexes);
          slide.hexElements.push(
            ...Array.from(hexRow.querySelectorAll(".hex"))
          );
        }
      }
    }
  }
}

function preprocessSwimmer(swimmer) {
  const stats = swimmer;
  const slides = [];
  document.querySelectorAll(".always-visible").forEach((element) => {
    slides.push({ name: element.dataset.name });
  });

  slides.push({
    name: "welcome",
    basicReplacements: {
      name: stats.name,
    },
  });


  slides.push({
    name: "season-best",
    templateReplacements: [{
      name: "event-and-time",
      sets: Object.keys(stats.seasonPrs)
        .map(event => { return {
          "event": event,
          "time": stats.seasonPrs[event],
      }}),
    }],
  });

  if (stats.fly25Times) {
    slides.push({
      name: "25-butterfly-times",
      templateReplacements: [{
        name: "meet-and-time",
        sets: stats.fly25Times,
      }],
    });
  }

  if (stats.free25Times) {
    slides.push({
      name: "25-freestyle-times",
      templateReplacements: [{
        name: "meet-and-time",
        sets: stats.free25Times,
      }],
    });
  }

  if (stats.breast25Times) {
    slides.push({
      name: "25-breaststroke-times",
      templateReplacements: [{
        name: "meet-and-time",
        sets: stats.breast25Times,
      }],
    });
  }

  if (stats.back25Times) {
    slides.push({
      name: "25-backstroke-times",
      templateReplacements: [{
        name: "meet-and-time",
        sets: stats.back25Times,
      }],
    });
  }

  if (stats.fly50Times) {
    slides.push({
      name: "50-butterfly-times",
      templateReplacements: [{
        name: "meet-and-time",
        sets: stats.fly50Times,
      }],
    });
  }

  if (stats.free50Times) {
    slides.push({
      name: "50-freestyle-times",
      templateReplacements: [{
        name: "meet-and-time",
        sets: stats.free50Times,
      }],
    });
  }

  if (stats.breast50Times) {
    slides.push({
      name: "50-breaststroke-times",
      templateReplacements: [{
        name: "meet-and-time",
        sets: stats.breast50Times,
      }],
    });
  }

  if (stats.back50Times) {
    slides.push({
      name: "50-backstroke-times",
      templateReplacements: [{
        name: "meet-and-time",
        sets: stats.back50Times,
      }],
    });
  }

  if (stats.paperPlate || stats.swimmerOfTheWeek || stats.goldenGoggles) {
    slides.push({
      name: "transition-2",
    });
  }

  if (stats.paperPlate) {
    slides.push({
      name: "paper-plate",
      basicReplacements: {
        award: stats.paperPlate,
      },
    });
  }

  if (stats.swimmerOfTheWeek) {
    slides.push({
      name: "swimmer-of-the-week",
    });
  }

  if (stats.goldenGoggles) {
    slides.push({
      name: "golden-goggle",
      basicReplacements: {
        award: stats.goldenGoggles,
      },
    });
  }

  if (stats.championEvents) {
    slides.push({
      name: "champion-events",
      basicReplacements: {
        events: stats.championEvents.join("<br>"),
      },
    });
  }

  if (stats.university) {
    slides.push({
      name: "goodbye-senior",
      basicReplacements: {
        "university": stats.university,
      },
    });
  } else {
    slides.push({ name: "goodbye" });
  }

  if (stats["2024Wrapped"]) {
    slides.push({
      name: "previous-wrapped",
    });

    document.getElementById("previous-season-wrapped-link").href += `?swimmer=${swimmerName}`;
  }

  swimmer.slides = slides;
}

function processSwimmer(swimmer) {
  const slideNameToMetadata = new Map(
    swimmer.slides.map((slide) => [slide.name, slide])
  );
  slides = slides.filter((slide) => slideNameToMetadata.has(slide.name));

  for (const slide of slides) {
    const metadata = slideNameToMetadata.get(slide.name);

    processSwimmerBasicReplacements(slide, metadata);
    processSwimmerTemplateReplacements(slide, metadata);
    processSwimmerVisibility(slide, metadata);
  }
}

function processSwimmerBasicReplacements(slide, metadata) {
  if (!metadata.basicReplacements) {
    return;
  }

  for (const [replacementKey, replacementValue] of Object.entries(
    metadata.basicReplacements
  )) {
    updatePlaceholders(slide.element, replacementKey, replacementValue);
  }
}

function processSwimmerTemplateReplacements(slide, metadata) {
  console.log(slide, metadata);
  if (!metadata.templateReplacements) {
    return;
  }

  for (const templateReplacement of metadata.templateReplacements) {
    const template = slide.element.querySelector(
      ".template-" + templateReplacement.name
    );
    for (const set of templateReplacement.sets) {
      const copy = template.content.cloneNode(true);
      for (const [replacementKey, replacementValue] of Object.entries(set)) {
        updatePlaceholders(copy, replacementKey, replacementValue);
      }
      template.parentElement.appendChild(copy);
    }
  }
}

function updatePlaceholders(element, replacementKey, replacementValue) {
  const placeholderElements = element.querySelectorAll(
    ".replacement-" + replacementKey
  );
  if (placeholderElements.length === 0) {
    console.error("Unable to find placeholder with key " + replacementKey);
    return;
  }
  placeholderElements.forEach((placeholderElement) => {
    placeholderElement.innerHTML = replacementValue;
  });
}

function processSwimmerVisibility(slide, metadata) {
  if (!metadata.visible) {
    return;
  }
  for (const name of metadata.visible) {
    const hiddenElements = slide.element.querySelectorAll(".visible-" + name);
    if (hiddenElements.length === 0) {
      console.error("Unable to find hidden element with name " + name);
    }
    hiddenElements.forEach(
      (hiddenElement) => (hiddenElement.style.display = "unset")
    );
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
    var x = Math.floor(random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

// https://stackoverflow.com/a/47593316
function cyrb128(str) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
