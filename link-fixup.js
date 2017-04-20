(function () {
  'use strict';
  if (window.location.hash.length < 1) {
    return;
  }

  var fragid = decodeURIComponent(window.location.hash.substr(1));

  if (fragid && document.getElementById(fragid)) {
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', '/multipage/fragment-links.json');
  xhr.onload = function() {
    var fragmentLinks = xhr.response;

    // handle section-foo.html links from the old old multipage version,
    // and broken foo.html from the new version
    if (!fragid || !(fragid in fragmentLinks)) {
      var m = window.location.pathname.match(/\/(?:section-)?([\w\-]+)\.html/);
      if (m) {
        fragid = m[1];
      }
    }

    var page = fragmentLinks[fragid];
    if (page) {
      window.location.replace(page + '.html#' + encodeURIComponent(fragid));
    }
  };
  xhr.send();
})();
(function() {
  var cx = '001828621583918965638:voscrlt_l3w';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})()
var headerElement = document.querySelector("header"),
  gcseSearch = document.createElement("div"),
  searchButton = document.createElement("p"),
  searchWidget = document.createElement("div"),
  searchWidgetCloseImg = document.createElement("img"),
  searchWidgetStyle = document.createElement("style"),
  searchWidgetStyleProperties = `
    #searchbutton {
       position: fixed;
       top: 0;
       right: 18px;
       background: #eee;
       font-size: 12px;
       padding: 2px 5px 2px 5px;
       border-radius: 0 0 6px 6px;
       z-index: 4;
       cursor: pointer;
    }
    #searchwidget {
      display: none;
      width: 300px;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 5;
      padding-right: 12px
    }
    #searchwidget table td, table th,
      table thead, table tbody { border: none; }
    #searchwidget .gsc-input { background: none !important}
    #searchwidgetclose {
      position: fixed;
      top: 6px;
      right: 20px;
      z-index: 6;
      cursor: pointer;
    }
    .gsc-control-wrapper-cse { width: 260px; padding-top: 4px }
    .gsc-search-button { padding-top: 5px; width: 10px; max-width: 10px}
    .gsc-search-box-tools .gsc-search-box .gsc-input { padding-right: 0 }
    .cse .gsc-search-button input.gsc-search-button-v2,
      input.gsc-search-button-v2 { padding: 6px 8px }
    #gsc-i-id1 { padding-bottom: 10px !important; }
    .head { padding: 1.5em 0 0 0 }
    .head .logo img { top: 1.5em }
    `
placeholderText = "Search the full text of the spec"

gcseSearch.className = "gcse-search"
searchButton.id = "searchbutton"
searchButton.textContent = "Search"
searchButton.title = placeholderText
searchWidget.id = "searchwidget"
searchWidgetCloseImg.id = "searchwidgetclose"
searchWidgetCloseImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAVFJREFUGBmNkb9Kw1AUxpM0/whOIog41EGwLkIRiyTEDIKLz+DkUNRRaAsNIZAlJHOn2lF8hYKTmDiIbaFDdBLFd0jTpEn9TtDFyQNfzrnn/u7JlxuGQbTb7ReoSfXf6HQ6NvaG1GcJRN6HXlmWPXNdd0QbFK1W6xi9G5RVaMzh0V8ul1/Iu0VRDLrdbgM1Y5rmCVIP2oIiqM/iQTaOkAaAt2VZniiKMonjWE2SpMZx3BjDLjzPe64QHIbhp6qqU0mSdvDag/l8Xge0Bt3neX5NIHFkowzf9x94ng9pMZvNyp4gCMNfkBrlZCpg5RTpHJM3RFFkkJksy1Y0TXsPguCDmBImEJu9xWJRo+nwfUdgmqYNsqXrekQHKnSPOORAm9ATfF9alnVrGEYEv3XAe+iD11c5fOkhFuvQCLfRtG17ippxHOcR4BXKN6j6w/3/D34DAXWL0NiyLMgAAAAASUVORK5CYII="
searchWidgetCloseImg.alt = "✕"
searchWidgetStyle.textContent = searchWidgetStyleProperties

headerElement.appendChild(searchButton)
headerElement.appendChild(searchWidget)
searchWidget.appendChild(searchWidgetCloseImg)
searchWidget.appendChild(searchWidgetStyle)
searchWidget.appendChild(gcseSearch)

searchWidgetCloseImg.addEventListener("click",
    e => searchWidget.style.display = "none")
searchButton.addEventListener("click",
    function() {
      searchWidget.style.display = "block"
      var searchInput = document.getElementById("gsc-i-id1");
      searchInput.placeholder = placeholderText
      searchInput.focus()
    })
