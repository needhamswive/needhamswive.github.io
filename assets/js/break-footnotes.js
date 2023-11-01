window.addEventListener("DOMContentLoaded", () => {
  const footnotes = document.querySelectorAll(".footnotes li p");
  for (const footnote of footnotes) {
    footnote.innerHTML = footnote.innerHTML.replace(/&nbsp;/g, " ");
  }
});
