import {getClipList} from "./youtubeRestClient";
import ClipList from "./ClipList";
import "./app.scss";

let clipList = new ClipList();
let main = document.createElement("main");


let searchInputContainer = document.createElement("div");
searchInputContainer.classList.add('search-box');

let searchInput = document.createElement("input");
searchInput.id = "keyword";
searchInput.classList.add('search-box__input');
searchInput.setAttribute("type", "search");
searchInput.setAttribute("value", "");
searchInput.setAttribute("placeholder", "Введите запрос");
searchInputContainer.appendChild(searchInput);

main.appendChild(searchInputContainer);
document.body.appendChild(main);
let clipListContainer = clipList.renderClipList();
document.getElementsByTagName('main')[0].appendChild(clipListContainer);


document.getElementById('keyword').addEventListener('keypress', function(event){
    if(event.keyCode === 13) {
        getClipList(this.value).then(function(response){
            clipList.setClips(JSON.parse(response).items);
            clipList.getPagesCount();
            clipList.renderPage(1);
        })
        .catch(function(err){
            console.error(err);
        });
    }
});

window.addEventListener("resize", resizeThrottler, false);

let resizeTimeout;
function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            actualResizeHandler();

            // The actualResizeHandler will execute at a rate of 15fps
        }, 66);
    }
}

function actualResizeHandler() {
    clipList.getPagesCount();
    clipList.updateClipList(clipList.getCurrPage);
    clipList.renderNavigation();
}



let clipNavigationContainer = document.querySelector('.clip-list__nav');
clipNavigationContainer.addEventListener('click', function(event){
    if(event.target.className === 'dot'){
        let currPageIndex = clipList.getCurrPage;
        const newCurrPage = parseInt(event.target.innerText, 10);
        let currPage = document.querySelector('.dot_active');
        currPage.classList.remove('dot_active');
        event.target.classList.add('dot_active');
        clipList.renderPage(newCurrPage);
    }
});

let down = false;
let mouseX = 0;
let translateX = 0;
//let clipsWrapper = document.querySelector('.clip-list__wrapper');
clipListContainer.addEventListener('mousedown', function(event){
    event.preventDefault();
    down = true;
    mouseX = event.clientX;
    return false;
});

clipListContainer.addEventListener('touchstart', function(event){
    event.preventDefault();
    down = true;
    mouseX = event.touches[0].pageX;
    return false;
});

clipListContainer.addEventListener('mousemove', function(event){
    if(down){
        let newMouseX = event.clientX;
        translateX = newMouseX - mouseX;
        this.firstChild.style.transform = `translateX(${translateX}px)`;
    }
});

clipListContainer.addEventListener('touchmove', function(event){
    if(down){
        let newMouseX = event.touches[0].pageX;
        translateX = newMouseX - mouseX;
        this.firstChild.style.transform = `translateX(${translateX}px)`;
    }
});

document.addEventListener('mouseup', function(event){
    if(translateX < 0) clipList.renderPage(clipList.getCurrPage + 1);
    else if(translateX > 0 && clipList.getCurrPage !== 1) clipList.renderPage(clipList.getCurrPage - 1);
    down = false;
});

document.addEventListener('touchend', function(event){
    if(translateX < 0) clipList.renderPage(clipList.getCurrPage + 1);
    else if(translateX > 0 && clipList.getCurrPage !== 1) clipList.renderPage(clipList.getCurrPage - 1);
    down = false;
});