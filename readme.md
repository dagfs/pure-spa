# Vanilla SPA

Back when I first started studing IT i figured I wanted to create a single page application. Only knowing JavaScript, being aware jQuery, but having felt the problems jQuery once solved, I figured lets go pure JS! Fast forward a few years and the desire to go back to an approach relying less on frameworks and libraries arises again.

_What do we need to have a working PWA?_ We need some way of knowing what content to show, preferable in a way that allowes a user to link to the correct content. We need some way to show the correct information.

## Navigation

On hash change and urls

```js
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
```

## Templates

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

```js
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
```

## Code to run on entering page

```js
// Code to run for each page
pageFunctions = {};
pageFunctions["page404"] = function() {
  ELEMENTS.PAGES["page404"].error.innerHTML = `Page ${location.hash.substr(
    1
  )} not found!`;
};
```

## Demo

Working sample available at [https://dagfrode.no/vanilla-spa/src](https://dagfrode.no/vanilla-spa/src)

## Resources

- [MDN web docs - Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Do we still need JavaScript frameworks?](https://www.freecodecamp.org/news/do-we-still-need-javascript-frameworks-42576735949b/)

# Ideas

- Do we need frameworks? meh
- Web Components? yey

https://github.com/DagF/norbrygg
