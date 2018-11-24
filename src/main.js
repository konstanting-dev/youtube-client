import ClipsContainer from "./ClipsContainer";
import SearchBox from "./SearchBox";
import "./app.scss";

let main = document.createElement("main");


let searchInputContainer = document.createElement("div");
searchInputContainer.classList.add('search-box');
let clipListElement = document.createElement("div");
clipListElement.classList.add('clip-list');
main.appendChild(searchInputContainer);
main.appendChild(clipListElement);
document.body.appendChild(main);
let clipListContainer = new ClipsContainer(document.querySelector('.clip-list'));
new SearchBox(document.querySelector('.search-box'));

window.addEventListener("resize", resizeThrottler, false);

let resizeTimeout;
function resizeThrottler() {
    if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            actualResizeHandler();
        }, 66);
    }
}

function actualResizeHandler() {
  clipListContainer.updateListSettings();
}

document.getElementById('keyword').addEventListener('keypress', function(event){
  if(event.keyCode === 13) {
    let clipList = document.querySelector('.clip-list');
    clipList.dispatchEvent(new CustomEvent('getClips', {
      detail: {
        keyword: event.target.value
      }
    }));
  }
});
