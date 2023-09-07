let progressBar;
let progressBarAnimation;
let progressBarStartTime;
let slides;
let activeSlide;
let activeSlideIndex;

window.addEventListener("DOMContentLoaded", () => {
  progressBar = document.getElementsByClassName("progress")[0];
  progressBarStartTime = Date.now();
  slides = Array.from(document.getElementsByClassName("slide"));
  activeSlideIndex = 0;
  activeSlide = document.getElementsByClassName("active")[activeSlideIndex];
  setupNavigation();
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
  if (elapsedTime < 1000 && activeSlideIndex > 0) {
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
