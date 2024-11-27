class Slide {
  name;
  element;

  constructor(name, element) {
    this.name = name;
    this.element = element;
  }
}

let meters = [];
let activeProgressBar;
let progressBarAnimation;
let progressBarStartTime;
let slides;
let activeSlide;
let activeSlideIndex;
let forwardElement;

const athleteName = new URLSearchParams(window.location.search).get("athlete");
const athletePath =
  window.location.origin +
  `/assets/high-school/girls/season-wrapped/2024/athletes/${athleteName}.json`;
const athleteRequest = fetch(athletePath);

let random = mulberry32(cyrb128(athleteName)[0]);

window.addEventListener(
  "DOMContentLoaded",
  async () => {
    forwardElement = document.querySelector("#forward");
    slides = Array.from(document.querySelectorAll(".slide")).map(
      (element) => new Slide(element.dataset.name, element)
    );
    activeSlide =
      slides.filter((slide) => slide.element.classList.contains("active"))[0] ||
      slides[0];
    activeSlide.element.classList.add("active");

    const athleteResponse = await athleteRequest;

    if (athleteResponse.status === 404) {
      slides = slides.slice(0, 1);
      return;
    }

    const athlete = await athleteResponse.json();

    activeSlideIndex = slides.indexOf(activeSlide);

    processAthlete(athlete);
    setupProgressBar();
    setupNavigation();
    setupBubbles();
    setupCharts();
  },
  false
);

const ANDREA = "Andrea Qie";
const CLARA = "Clara Eilenberg";

function processAthlete(athlete) {
  document.getElementById("name").innerHTML = athlete.name;
  document.getElementById("class").innerHTML = 2037 - athlete.grade;

  if (athlete.name !== ANDREA) {
    removeSlide("school-record");
  }

  console.log(athlete);

  if (athlete.name === CLARA) {
    removeSlide("goodbye");
    removeSlide("goodbye-senior");
  } else if (athlete.grade === 12) {
    removeSlide("goodbye");
    removeSlide("goodbye-clara");
  } else {
    removeSlide("goodbye-clara");
    removeSlide("goodbye-senior");
  }

  if (athlete.has_2023_wrapped) {
    document.getElementById("previous-season-wrapped-link").href += `?student=${athlete.name.toLowerCase().replace(" ", "-")}`;
  } else {
    removeSlide("previous-wrapped");
  }
}

function removeSlide(slideName) {
  slides = slides.filter(slide => slide.name != slideName);
}

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

  const lastSlide = nextIndex === slides.length - 1;
  if (lastSlide) {
    forwardElement.style.display = "none";
  } else {
    forwardElement.style.display = "block";
  }
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

const bubbleColors = [
  "rgb(215, 195, 255, .3)",  // purple
  "rgb(255, 203, 230, .3)",  // red
  "rgb(255, 188, 188, .3)"   // orange
];

const Direction = Object.freeze({
  UP: "up",
  DOWN: "down",
});

function setupBubbles() {
  const background = document.getElementById("background");

  for (let i = 0; i < 10; i++) {
    background.appendChild(bubble(Direction.UP, i));
  }

  for (let i = 0; i < 10; i++) {
    background.appendChild(bubble(Direction.DOWN, i));
  }


  function bubble(direction, i) {
    const bubble = document.createElement("div");
    const size  = 50 * random() + 30;

    bubble.style.left = `${100 * random()}%`;
    bubble.style.width = bubble.style.height = `${size}px`;
    bubble.style.backgroundColor = bubbleColors[Math.floor(3 * random())];
    bubble.style.animationDelay = `${4 * random() + 1.5 * i}s`;
    bubble.style.animationDuration = `${20 * random() + 30}s`;

    if (direction == Direction.UP) {
      bubble.classList.add("bubble-up");
      bubble.style.bottom = `-${size}px`;
    } else {
      bubble.classList.add("bubble-down");
      bubble.style.top = `-${size}px`;
    }

    return bubble
  }
}

const chartBackgroundColor = "rgb(215, 195, 255, 0.6)";
const chartOptions = {
  backgroundColor: chartBackgroundColor,
  plugins: {
    legend: {
      display: false,
    }
  },
  scales: {
    r:  {
      max: 10,
      min: 0,
      beginAtZero: true,
      ticks: {
        display: false,
        stepSize: 1,
      },
    },
  },
};

function setupCharts() {
  new Chart(document.getElementById("swim-radar-chart"), {
    type: "radar",
    data: {
      labels: ["Fly", "Back", "Breast", "Free", "IM"],
      datasets: [{
        data: [10, 3, 5, 9, 10],
        borderWidth: 1
      }],
    },
    options: chartOptions,
  });

  new Chart(document.getElementById("dive-radar-chart"), {
    type: "radar",
    data: {
      labels: ["Forward", "Backward", "Reverse", "Inward", "Twisting"],
      datasets: [{
        data: [10, 7, 2, 9, 10],
        borderWidth: 1
      }],
    },
    options: chartOptions,
  });

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
