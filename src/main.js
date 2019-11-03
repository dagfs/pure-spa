// Define html element references
// Define html element references
PAGES = {};

// Main page
PAGES.main = {};
PAGES.main.page = document.querySelector("#main");

// Some other page
PAGES.page2 = {};
PAGES.page2.page = document.querySelector("#page2");

// 404
PAGES["page404"] = {};
PAGES["page404"].page = document.querySelector("#page404");
PAGES["page404"].error = document.querySelector("#page404-error");

// Code to run for each page
pageFunctions = {};
pageFunctions["page404"] = function() {
  PAGES["page404"].error.innerHTML = `Page ${location.hash.substr(
    1
  )} not found!`;
};

// Navigation
function navigate() {
  var path = location.hash
    .substr(1)
    .toLowerCase()
    .split("/");

  var currentPage = path[0];
  if (!PAGES.hasOwnProperty(currentPage)) {
    if (path[0] === "") {
      currentPage = "main";
    } else {
      currentPage = "page404";
    }
  }

  for (var page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      PAGES[page].page.classList.remove("active");
    }
  }

  PAGES[currentPage].page.classList.add("active");
  if (pageFunctions.hasOwnProperty(currentPage)) {
    pageFunctions[currentPage]();
  }
}

navigate();

window.onhashchange = navigate;
