// Define html element references
var ELEMENTS = {};
ELEMENTS.PAGES = {};
ELEMENTS.PAGES.main = document.querySelector("#main");
ELEMENTS.PAGES.page2 = document.querySelector("#page2");

// Navigation
function navigate() {
  var path = location.hash.substr(1).split("/");
  if (ELEMENTS.PAGES.hasOwnProperty(path[0])) {
    for (var page in ELEMENTS.PAGES) {
      if (ELEMENTS.PAGES.hasOwnProperty(page)) {
        ELEMENTS.PAGES[page].classList.remove("active");
      }
    }
    ELEMENTS.PAGES[path[0]].classList.add("active");
  }
}

navigate();

window.onhashchange = navigate;
