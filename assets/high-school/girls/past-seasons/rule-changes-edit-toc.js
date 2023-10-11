window.addEventListener("DOMContentLoaded", () => {
	const toc = document.getElementsByClassName("toc__menu")[0];
	for (const listItem of toc.children) {
		const tocSectionDisplay = listItem.children[0].innerHTML;
		listItem.children[0].innerHTML = tocSectionDisplay.substring(0, tocSectionDisplay.length - 2);
	}
}, false);
