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
      "top left": [5, 3, 1],
      "bottom right": [7, 5, 1],
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
    slideNames: ["transition"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [3, 1, 1],
      "top right": [2, 1],
      "bottom left": [1],
      "bottom right": [5, 3, 1],
    },
  },
  {
    slideNames: ["practice-summary"],
    colors: ["blue", "blue", "gold", "gold", "gold"],
    corners: {
      "top left": [3, 1],
      "top right": [2, 1],
      "bottom left": [7, 3, 1],
    },
  },
  {
    slideNames: ["swims-summary", "dives-summary", "special-message"],
    colors: ["blue", "blue", "gold", "gold", "gold"],
    corners: {
      "top left": [1],
      "top right": [1],
      "bottom left": [1],
      "bottom right": [1],
    },
  },
  {
    slideNames: ["beads-earned"],
    colors: ["blue", "blue", "gold", "gold", "gold"],
    corners: {
      "top right": [5, 3, 1],
      "bottom left": [7, 5, 1],
    },
  },
  {
    slideNames: ["record-breaker"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [5, 1],
      "bottom right": [7, 3, 1],
    },
  },
  {
    slideNames: ["goodbye", "goodbye-senior"],
    colors: ["blue", "gold"],
    corners: {
      "top left": [2, 1],
      "top right": [2, 1],
      "bottom left": [2, 1],
      "bottom right": [2, 1],
    },
  },
];

const PR_EVENT_ORDER = [
  "200 Individual Medley",
  "200 Freestyle",
  "50 Freestyle",
  "1 Meter - 6 Dives",
  "1 Meter - 11 Dives",
  "100 Butterfly",
  "100 Freestyle",
  "500 Freestyle",
  "100 Backstroke",
  "100 Breaststroke",
  "50 Backstroke Split",
  "50 Breaststroke Split",
  "50 Butterfly Split",
  "50 Freestyle Split",
  "100 Freestyle Split",
];

let meters = [];
let activeProgressBar;
let progressBarAnimation;
let progressBarStartTime;
let slides;
let activeSlide;
let activeSlideIndex;

let hexTemplate;

const studentName = new URLSearchParams(window.location.search).get("student");
const studentPath =
  window.location.origin +
  `/assets/high-school/girls/season-wrapped/2023/students/${studentName}.json`;
const studentRequest = fetch(studentPath);

let random = mulberry32(cyrb128(studentName)[0]);

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
    // window.setInterval(animateHexes, 1000);

    const studentResponse = await studentRequest;

    if (studentResponse.status === 404) {
      slides = slides.slice(0, 1);
      return;
    }

    const student = await studentResponse.json();
    preprocessStudent(student);
    processStudent(student);
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

function animateHexes() {
  if (activeSlide.hexColors.length <= 1) {
    return;
  }

  const numberToChange = 1;
  const hexElementsToChange = getRandom(
    activeSlide.hexElements,
    numberToChange
  );

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

function preprocessStudent(student) {
  const stats = student.stats;
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

  const practiceSummarySlide = {
    name: "practice-summary",
    basicReplacements: {
      "practices-attended": stats.practicesAttended,
      "practice-percentage": stats.practicePercentage,
    },
  };
  if (!stats.diver) {
    practiceSummarySlide.basicReplacements["yards-swum"] = stats.yardsSwum;
    practiceSummarySlide.visible = ["yards-swum"];
  }
  slides.push(practiceSummarySlide);

  if (stats.individualSwims || stats.relaySwims) {
    const swimsSummarySlide = {
      name: "swims-summary",
      basicReplacements: {
        "individual-swims": stats.individualSwims,
        "relay-swims": stats.relaySwims,
      },
      templateReplacements: [],
      visible: [],
    };
    if (stats.individualSwims > 0) {
      swimsSummarySlide.visible.push("individual-swims");
    }
    if (stats.swimPointsScored) {
      swimsSummarySlide.basicReplacements["points-scored"] =
        stats.swimPointsScored;
      swimsSummarySlide.visible.push("points-scored");
    }
    if (stats.sectionalsQualifiedSwimEvents) {
      swimsSummarySlide.templateReplacements.push({
        name: "sectionals-qualified-swim-event",
        sets: stats.sectionalsQualifiedSwimEvents.map((eventName) => {
          return { event: eventName };
        }),
      });
      swimsSummarySlide.visible.push("sectionals-qualified-swim-events");
    }
    if (stats.statesQualifiedSwimEvents) {
      swimsSummarySlide.templateReplacements.push({
        name: "states-qualified-swim-event",
        sets: stats.statesQualifiedSwimEvents.map((eventName) => {
          return { event: eventName };
        }),
      });
      swimsSummarySlide.visible.push("states-qualified-swim-events");
    }
    if (
      stats.sectionalsQualifiedSwimEvents &&
      stats.statesQualifiedSwimEvents
    ) {
      swimsSummarySlide.visible.push("and");
    }
    slides.push(swimsSummarySlide);
  }

  if (stats.diver) {
    const divesSummarySlide = {
      name: "dives-summary",
      basicReplacements: {
        "individual-dives": stats.individualDives,
        "meets-dove": stats.meetsDove.length,
      },
      templateReplacements: [
        {
          name: "dive-number-and-score",
          sets: stats.topScoringDives,
        },
      ],
      visible: [],
    };
    if (stats.divePointsScored) {
      divesSummarySlide.basicReplacements["points-scored"] =
        stats.divePointsScored;
      divesSummarySlide.visible.push("points-scored");
    }
    if (stats.meetsDove.length > 1) {
      divesSummarySlide.visible.push("multiple-meets-dove");
    }
    slides.push(divesSummarySlide);
  }

  const beadsEarnedSlide = {
    name: "beads-earned",
    basicReplacements: {
      "white-beads-earned": stats.beadsEarned.white,
    },
    visible: [],
  };
  if (stats.beadsEarned.blue) {
    beadsEarnedSlide.basicReplacements["blue-beads-earned"] =
      stats.beadsEarned.blue;
    beadsEarnedSlide.visible.push("blue-beads");
  }
  if (stats.beadsEarned.gold) {
    beadsEarnedSlide.basicReplacements["gold-beads-earned"] =
      stats.beadsEarned.gold;
    beadsEarnedSlide.visible.push("gold-beads");
  }
  slides.push(beadsEarnedSlide);

  slides.push({
    name: "season-best",
    templateReplacements: [{
      name: "event-and-result",
      sets: Object.keys(stats.seasonPrs)
        .sort((a, b) => PR_EVENT_ORDER.indexOf(a) - PR_EVENT_ORDER.indexOf(b))
        .map(event => { return {
          "event": event,
          "result": stats.seasonPrs[event],
      }}),
    }],
  });

  if (stats.recordBreaker) {
    slides.push({ name: "record-breaker" });
  }

  if (stats.specialMessage) {
    slides.push({
      name: "special-message" ,
      basicReplacements: {
        "message": stats.specialMessage,
      },
    });
  }

  if (stats.grade === 12) {
    slides.push({ name: "goodbye-senior" });
  } else {
    slides.push({ name: "goodbye" });
  }

  student.slides = slides;
}

function processStudent(student) {
  const slideNameToMetadata = new Map(
    student.slides.map((slide) => [slide.name, slide])
  );
  slides = slides.filter((slide) => slideNameToMetadata.has(slide.name));

  for (const slide of slides) {
    const metadata = slideNameToMetadata.get(slide.name);

    processStudentBasicReplacements(slide, metadata);
    processStudentTemplateReplacements(slide, metadata);
    processStudentVisibility(slide, metadata);
  }
}

function processStudentBasicReplacements(slide, metadata) {
  if (!metadata.basicReplacements) {
    return;
  }

  for (const [replacementKey, replacementValue] of Object.entries(
    metadata.basicReplacements
  )) {
    updatePlaceholders(slide.element, replacementKey, replacementValue);
  }
}

function processStudentTemplateReplacements(slide, metadata) {
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

function processStudentVisibility(slide, metadata) {
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
