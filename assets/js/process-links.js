// https://stackoverflow.com/questions/807878/how-to-make-javascript-execute-after-page-load
window.addEventListener("DOMContentLoaded", () => {
  // Add `{:target="_blank" rel="nofollow noopener noreferrer"}`
  // https://stackoverflow.com/questions/4425198/can-i-create-links-with-target-blank-in-markdown
  const links = document.links;
  for (const link of links) {
    if (link.hostname != window.location.hostname) {
      link.target = "_blank";
      link.rel = "nofollow noopener noreferrer";
    }
  }

  const searchParams = new URLSearchParams(window.location.search);
  const navTags =
    searchParams
      .get("nav")
      ?.split(",")
      .filter((tag) => tag !== "") || [];

  if (navTags.length > 0) {
    for (const link of document.querySelectorAll(".nav__list a")) {
      const url = new URL(link.href);
      url.searchParams.set("nav", navTags.join(","));
      link.href = url.href;
    }
  }

  const tagsElements = document.querySelectorAll("[data-nav-tags]");
  const noTagsElements = document.querySelectorAll("[data-no-nav-tags]");

  for (const element of tagsElements) {
    if (
      !element.dataset.navTags.split(",").some((tag) => navTags.includes(tag))
    ) {
      element.style.display = "none";
    }
  }

  for (const element of noTagsElements) {
    if (
      element.dataset.noNavTags.split(",").some((tag) => navTags.includes(tag))
    ) {
      element.style.display = "none";
    }
  }
});
