// Define html element references
var ELEMENTS = {};
ELEMENTS.PAGES = {};
ELEMENTS.PAGES.main = {};
ELEMENTS.PAGES.main.page = document.querySelector("#main");
ELEMENTS.PAGES.page2 = {};
ELEMENTS.PAGES.page2.page = document.querySelector("#page2");
ELEMENTS.PAGES["page404"] = {};
ELEMENTS.PAGES["page404"].page = document.querySelector("#page404");
ELEMENTS.PAGES["page404"].error = document.querySelector("#page404-error");

// Code to run for each page
pageFunctions = {};
pageFunctions["page404"] = function() {
  ELEMENTS.PAGES["page404"].error.innerHTML = `Page ${location.hash.substr(
    1
  )} not found!`;
};

// Navigation
function navigate() {
  var path = location.hash.substr(1).split("/");
  var currentPage = path[0].toLowerCase();
  if (!ELEMENTS.PAGES.hasOwnProperty(currentPage)) {
    if (path[0] === "") {
      currentPage = "main";
    } else {
      currentPage = "page404";
    }
  }
  for (var page in ELEMENTS.PAGES) {
    if (ELEMENTS.PAGES.hasOwnProperty(page)) {
      ELEMENTS.PAGES[page].page.classList.remove("active");
    }
  }
  ELEMENTS.PAGES[currentPage].page.classList.add("active");
  if (pageFunctions.hasOwnProperty(currentPage)) pageFunctions[currentPage]();
}

navigate();

window.onhashchange = navigate;
