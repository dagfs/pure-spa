# Vanilla SPA

Back when I started studying IT, I figured I wanted to create a Single Page Application(SPA). I knew some HTML, css and JavaScript, and that was enough to get something up and running.

Fast forward a few years and the desire to go back to an approach relying less on frameworks and libraries arises again. It is so easy to add React, Vue, or Angular, to something that might not need it. It is also nice to be reminded of what these frameworks solves for us and how they limit us.

Lets look at how we can create a simple SPA:

## Templates

We need some way of showing content. By defining page, we can create templates for the different content we want to show and add the static content for each page.

```html
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="main.css" />
  </head>
  <body>
    <div id="main" class="page">
      <h1>main</h1>
      <a href="#page2">Page 2</a>
    </div>
    <div id="page2" class="page">
      <h1>page 2</h1>
      <a href="#main">Main</a>
    </div>
    <div id="page404" class="page">
      <h1>404</h1>
      <h2 id="page404-error"></h2>
    </div>
    <script src="main.js"></script>
  </body>
</html>
```

To access the templates, you can define an object structure to keep the structure of your pages and make it easier to reference the correct elements.

```js
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
```

## Navigation

We need some way of navigating between content in the SPA. By using the function `window.onhashchange`, we can detect when the hash in the url changes. Combinding this with anchors, and we have a nice way of changing the content of the SPA.

The url hash is easily accessible trough `location.hash`

```js
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

  // Hide the previous active page
  for (var page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      PAGES[page].page.classList.remove("active");
    }
  }

  // Show the active page and run its custom script
  PAGES[currentPage].page.classList.add("active");
  if (pageFunctions.hasOwnProperty(currentPage)) {
    pageFunctions[currentPage]();
  }
}

// First time loading the page
navigate();

window.onhashchange = navigate;
```

To only show the active page we need to add some default styling to hide all the pages.

```css
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}
```

The `PAGES` object we created makes it easy to add and remove a css class to the active page that should be displayed.

```css
.page.active {
  display: block;
}
```

## Custom code for each page

Some of the pages needs to load some additional information based on parameters in the url. To achieve this we can create a map of the pages with the code to run for each page.

```js
// Code to run for each page
pageFunctions = {};

// Custom code to run when showing the 404 page
pageFunctions["page404"] = function() {
  ELEMENTS.PAGES["page404"].error.innerHTML = `Page ${location.hash.substr(
    1
  )} not found!`;
};
```

## Demo

(might skip this / move it to another place)

Working sample available at [https://dagfrode.no/vanilla-spa/src](https://dagfrode.no/vanilla-spa/src)

<!--

---

## Resources

- [MDN web docs - Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Do we still need JavaScript frameworks?](https://www.freecodecamp.org/news/do-we-still-need-javascript-frameworks-42576735949b/)

# Ideas

- Do we need frameworks? meh
- Web Components? yey

https://github.com/DagF/norbrygg
-->
