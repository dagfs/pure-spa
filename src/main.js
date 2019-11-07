// Define html element references
// Define html element references
PAGES = {};

// Main page
PAGES.main = {};
PAGES.main.page = document.querySelector("#main");

// Some other page
PAGES.bom = {};
PAGES.bom.page = document.querySelector("#bom");
PAGES.bom.content = document.querySelector("#bommer");

// 404
PAGES.page404 = {};
PAGES.page404.page = document.querySelector("#page404");
PAGES.page404.error = document.querySelector("#page404-error");

// Code to run for each page
pageFunctions = {};

// Custom code to run when showing the 404 page
pageFunctions.page404 = function() {
  PAGES.page404.error.innerHTML = `Page ${location.hash.substr(1)} not found!`;
};

pageFunctions["bom"] = function() {
  fetch("https://hotell.difi.no/api/json/vegvesen/bomstasjoner?")
    .then(response => response.json())
    .then(json => {
      PAGES["bom"].content.innerHTML = json.entries.reduce((acc, bom) => {
        return (acc += bomInfo(bom));
      }, "");
    });
};

function bomInfo(bom) {
  return `
  <div class="bom">
  <h2>${bom.navn}</h2>
  <h3>Takst stor bil: ${bom.takst_stor_bil}</h3>
  <h3>Takst liten bil: ${bom.takst_liten_bil}</h3>
  </div>
  `;
}

var path;

// Navigation
function navigate() {
  // Get the url path in a easy
  path = location.hash
    .substr(1)
    .toLowerCase()
    .split("/");

  // Find what page to show
  var currentPage = path[0];
  if (!PAGES.hasOwnProperty(currentPage)) {
    if (path[0] === "") {
      currentPage = "main";
    } else {
      currentPage = "page404";
    }
  }

  console.log(currentPage);

  // Hide the previous active page
  for (var page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      PAGES[page].page.classList.remove("active");
    }
  }

  // Show the active page and run its custom script
  PAGES[currentPage].page.classList.add("active");

  //Run custom page code if it exists
  if (pageFunctions.hasOwnProperty(currentPage)) {
    pageFunctions[currentPage]();
  }
}

// First time loading the page
navigate();

window.onhashchange = navigate;
