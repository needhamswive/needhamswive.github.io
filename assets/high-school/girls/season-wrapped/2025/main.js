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

const ATHLETE_NAME = new URLSearchParams(window.location.search).get("athlete");
const ATHLETE_PATH =
  window.location.origin +
  `/assets/high-school/girls/season-wrapped/2025/athletes/${ATHLETE_NAME}.json`;
const ATHLETE_REQUEST = fetch(ATHLETE_PATH);

const random = mulberry32(cyrb128(ATHLETE_NAME)[0]);

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

    const athleteResponse = await ATHLETE_REQUEST;

    if (athleteResponse.status === 404) {
      slides = slides.slice(0, 1);
      return;
    }

    const athlete = await athleteResponse.json();

    activeSlideIndex = slides.indexOf(activeSlide);

    processAthlete(athlete);
    setupProgressBar();
    setupNavigation();
    setupBackground();
  },
  false
);

const BEAD_COLORS = ["blue", "gold", "white"];
const CHART_OPTIONS = {
  color: "rgb(232, 248, 255)",
  backgroundColor: "rgb(232, 248, 255, 0.5)",
  plugins: {
    legend: {
      display: false,
    },
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
      grid: {
        color: "rgb(232, 248, 255)",
      },
      angleLines: {
        color: "rgb(232, 248, 255)",
      },
      pointLabels: {
        color: "rgb(232, 248, 255)",
      },
    },
  },
};

function processAthlete(athlete) {
  document.getElementById("name").innerHTML = athlete.name;
  document.getElementById("class").innerHTML = 2038 - athlete.grade;
  document.getElementById("practices-attended").innerHTML = athlete.practices_attended;
  document.getElementById("practice-percentage").innerHTML = athlete.practice_percentage;

  for (const color of BEAD_COLORS) {
    const beadCount = athlete[`${color}_beads`];
    if (beadCount > 0) {
      document.getElementById(`${color}-beads`).innerHTML = beadCount;
    } else {
      removeElement(`${color}-beads-row`);
    }
  }

  if (athlete.swimmer) {
    document.getElementById("individual-swims").innerHTML = athlete.individual_swims;
    document.getElementById("relay-swims").innerHTML = athlete.relay_swims;
    document.getElementById("meets-swimmer").innerHTML = athlete.swim_meets;

    if (athlete.swim_points) {
      document.getElementById("points-swimmer-number").innerHTML = athlete.swim_points + (athlete.swim_points === 1 ? " points" : " points");
    } else {
      removeElement("points-swimmer");
    }
  } else {
    removeSlide("swims-summary");
  }

  if (athlete.diver) {
    document.getElementById("individual-dives").innerHTML = athlete.individual_dives;
    document.getElementById("meets-diver").innerHTML = athlete.dive_meets;

    if (athlete.dive_points) {
      document.getElementById("points-diver-number").innerHTML = athlete.dive_points + (athlete.dive_points === 1 ? " points" : " points");
    } else {
      removeElement("points-diver");
    }
  } else {
    removeSlide("dives-summary");
  }

  if (athlete.sectionals_qualified) {
    const element = document.getElementById("sectionals-qualified-events");
    for (const event of athlete.sectionals_qualified) {
      const eventElement = document.createElement("div");
      eventElement.classList.add("color");
      eventElement.innerHTML = event;
      element.appendChild(eventElement);
    }
  } else {
    removeSlide("sectionals-qualified");
  }

  if (athlete.states_qualified) {
    const element = document.getElementById("states-qualified-events");
    for (const event of athlete.states_qualified) {
      const eventElement = document.createElement("div");
      eventElement.classList.add("color");
      eventElement.innerHTML = event;
      element.appendChild(eventElement);
    }
  } else {
    removeSlide("states-qualified");
  }

  if (athlete.swimmer) {
    for (const i in athlete.swim_categories) {
      if (athlete.swim_categories[i] == "0.00") {
        athlete.swim_categories[i] = 1;
      } else {
        athlete.swim_categories[i] = 0.9 * athlete.swim_categories[i] + 1;
      }
    }

    new Chart(document.getElementById("swim-radar-chart"), {
      type: "radar",
      data: {
        labels: ["Fly", "Back", "Breast", "Free", "IM"],
        datasets: [{
          data: athlete.swim_categories,
          borderWidth: 1
        }],
      },
      options: CHART_OPTIONS,
    });
  } else {
    removeSlide("swim-radar-chart");
  }

  if (athlete.diver) {
    for (const i in athlete.dive_categories) {
      if (athlete.dive_categories[i] == "0.00") {
        athlete.dive_categories[i] = 1;
      } else {
        athlete.dive_categories[i] = 0.9 * athlete.dive_categories[i] + 1;
      }
    }

    new Chart(document.getElementById("dive-radar-chart"), {
      type: "radar",
      data: {
        labels: ["Forward", "Backward", "Reverse", "Inward", "Twisting"],
        datasets: [{
          data: athlete.dive_categories,
          borderWidth: 1
        }],
      },
      options: CHART_OPTIONS,
    });
  } else {
    removeSlide("dive-radar-chart");
  }

  if (athlete.superlative) {
    document.getElementById("superlative").innerHTML = athlete.superlative;
  } else {
    removeSlide("superlative");
  }

  if (!athlete.swimmer_of_the_week) {
    removeSlide("swimmer-of-the-week");
  }

  if (!athlete.bsc_honorable_mention) {
    removeSlide("bsc-honorable-mention");
  }

  if (!athlete.bsc_all_star) {
    removeSlide("bsc-all-star");
  }

  if (athlete.award) {
    document.getElementById("award").innerHTML = athlete.award;
  } else {
    removeSlide("award");
  }

  if (athlete.grade === 12) {
    removeSlide("goodbye");
  } else {
    removeSlide("goodbye-senior");
  }

  if (athlete.has_2024_wrapped) {
    document.getElementById("previous-season-wrapped-link").href += `?athlete=${athlete.name.toLowerCase().replace(" ", "-")}`;

    // All seniors have a previous season wrapped link
    if (athlete.grade === 12) {
      document.getElementById("senior-summary-link").href += `${athlete.name.toLowerCase().replace(" ", "-")}/`;
    } else {
      removeElement("senior-summary");
    }
  } else {
    removeSlide("previous-wrapped");
  }
}

function removeSlide(slideName) {
  slides = slides.filter(slide => slide.name != slideName);
}

function removeElement(id) {
  const element = document.getElementById(id);
  element.parentElement.removeChild(element);
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
  activeSlide.element.classList.remove("active");
  slides[nextIndex].element.classList.add("active");
  activeSlideIndex += offset;
  activeSlide = slides[nextIndex];
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
    const progressBar = meters[i].querySelector("span");

    if (i === activeSlideIndex) {
      progressBar.classList.remove("progress-done");
      progressBar.classList.add("progress-active");
    } else if (i < activeSlideIndex) {
      progressBar.classList.remove("progress-active");
      progressBar.classList.add("progress-done");
    } else {
      progressBar.classList.remove("progress-active");
      progressBar.classList.remove("progress-done");
    }
  }

  progressBarStartTime = Date.now();
}

class Projectile {
  x; y; dx; dy; speed;

  constructor(x, y, dx, dy, speed) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
  }
}

function setupBackground() {
  const COUNT = 100;
  const SIZE = 2;
  const BASE_SPEED = 0.25;
  const DISTANCE = 100;
  const R = 76;
  const G = 144;
  const B = 186;
  const PROJECTILE_COLOR = `rgba(${R}, ${G}, ${B}, ${0.5})`;
  const lineColor = (a) => `rgba(${R}, ${G}, ${B}, ${a})`;

  const background = document.getElementById("background");
  background.height = background.clientHeight;
  background.width = background.clientWidth;

  const context = background.getContext('2d');

  const projectiles = [];
  for (let i = 0; i < COUNT; i++) {
    const x = Math.floor(random() * background.width);
    const y = Math.floor(random() * background.height);
    const speed = BASE_SPEED + (BASE_SPEED / 2 - (random() * BASE_SPEED));

    let dx = random() - 0.5;
    let dy = random() - 0.5;
    const dnorm = Math.sqrt(dx ** 2 + dy ** 2);
    dx = dx / dnorm;
    dy = dy / dnorm;

    projectiles.push(new Projectile(x, y, dx, dy, speed));
  }

  function animate() {
    context.clearRect(0, 0, background.width, background.height);

    for (const projectile of projectiles) {
      drawCircle(projectile, SIZE);

      projectile.x += projectile.speed * projectile.dx;
      projectile.y += projectile.speed * projectile.dy;

      if (projectile.x < 0 || projectile.x > background.width) {
        projectile.dx *= -1;
      }

      if (projectile.y < 0 || projectile.y > background.height) {
        projectile.dy *= -1;
      }

      for (const neighbor of projectiles) {
        if (projectile === neighbor) {
          continue;
        }

        if (distance(projectile, neighbor) < DISTANCE) {
          drawLine(projectile, neighbor);
        }
      }
    }

    window.requestAnimationFrame(animate);
  }

  function drawCircle(position, radius) {
    context.fillStyle = PROJECTILE_COLOR;
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    context.fill();
  }

  function drawLine(position1, position2) {
    const a = ((DISTANCE - distance(position1, position2)) / DISTANCE) / 4;
    context.strokeStyle = lineColor(a);
    context.beginPath();
    context.moveTo(position1.x, position1.y);
    context.lineTo(position2.x, position2.y);
    context.stroke();
  }

  animate();
}

function distance(position1, position2) {
  return Math.sqrt((position1.x - position2.x) ** 2 + (position1.y - position2.y) ** 2);
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
