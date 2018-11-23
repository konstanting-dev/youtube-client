import {getViewCount} from "./youtubeRestClient";
import Clip from "./Clip";
import "./sass/clipList.scss";

export default class ClipList {
    constructor(clips = [], currentPage = 1, clipMargin = 0, pagesCount = 0, clipPerPage = 0) {
        this.clips = clips;
        this.currentPage = currentPage;
        this.clipMargin = clipMargin;
        this.pagesCount = pagesCount;
        this.clipsPerPage = clipPerPage;
    }

    setClips(clips){
        this.clips = this.clips.concat(clips.map((clip) => {
            const {title, publishedAt, description, thumbnails, channelTitle} = clip.snippet;
            const {videoId} = clip.id;

            let clipObject = new Clip(videoId, title, thumbnails["high"]["url"], channelTitle, publishedAt, 0, description);
            getViewCount(videoId)
                .then(function (response) {
                    const stats = JSON.parse(response);
                    clipObject.viewsCount = stats.items[0]["statistics"]["viewCount"];
                });
            return clipObject;
        }));
    };

    get getCurrPage(){
        return this.currentPage;
    };

    set setCurrPage(currentPage){
        this.currentPage = currentPage;
    };

    getPagesCount(){
        let clipListContainer = document.querySelector('.clip-list');
        let clipListContainerWidth = clipListContainer.offsetWidth;
        let clipPerPageCount = Math.floor(clipListContainerWidth / 400);
        this.clipsPerPage = clipPerPageCount;
        let clipMargin = (clipListContainerWidth - 400 * clipPerPageCount) / (clipPerPageCount * 2);
        if(clipMargin < 12.5){
            clipPerPageCount--;
            clipMargin = 12.5;
        }
        console.log(`Clip per page count ${clipPerPageCount}`);
        this.clipMargin = clipMargin;
        let pageCount = Math.floor(this.clips.length / clipPerPageCount);
        if(pageCount * clipPerPageCount !== this.clips.length) pageCount++;
        this.pagesCount = pageCount;

    };

    updateClipList(pageNumber){
        let clipListWrapper = document.querySelector('.clip-list__wrapper');
        while (clipListWrapper.firstChild) {
            clipListWrapper.removeChild(clipListWrapper.firstChild);
        }
        let currPageClips = this.clips.slice((pageNumber - 1) * this.clipsPerPage, pageNumber * this.clipsPerPage);
        this.currentPage = pageNumber;
        currPageClips.forEach((clip) => {
            let clipElement = clip.renderClip();
            Object.assign(clipElement.style, {
                marginLeft: `${this.clipMargin}px`,
                marginRight: `${this.clipMargin}px`
            });
            clipListWrapper.appendChild(clipElement);
        });
    };

    renderPage(newPageNumber){
        let clipList = document.querySelector('.clip-list');
        let clipListContainerWidth = clipList.offsetWidth;
        let clipListWrapper = document.querySelector('.clip-list__wrapper');
        if(newPageNumber > this.currentPage) clipListWrapper.style.transform = `translateX(${-clipListContainerWidth}px)`;
        else clipListWrapper.style.transform = `translateX(${clipListContainerWidth}px)`;
        let promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                while (clipListWrapper.firstChild) {
                    clipListWrapper.removeChild(clipListWrapper.firstChild);
                }
                resolve();
            }, 700);
        });

        promise.then(() =>{
            this.updateClipList(newPageNumber);
        }).then(() => {
            clipListWrapper.style.transform = `translateX(0px)`;
        }).then(() => {
            clipList.appendChild(this.renderNavigation());
        });
    };

    renderNavigation(){
        let navContainer = document.querySelector('.clip-list__nav');
        while (navContainer.firstChild) {
            navContainer.removeChild(navContainer.firstChild);
        }
        for(let i = 0; i < this.pagesCount; i++){
            let navControl = document.createElement('span');
            navControl.classList.add('dot');
            if(i === this.currentPage - 1) navControl.classList.add('dot_active');
            navControl.innerText = i + 1;
            navContainer.appendChild(navControl);
        }
        return navContainer;
    };

    renderClipList(){
        let clipListContainer = document.createElement('div');
        clipListContainer.classList.add('clip-list');
        let clipListWrapper = document.createElement('div');
        clipListWrapper.classList.add('clip-list__wrapper');
        clipListContainer.appendChild(clipListWrapper);
        let clipNavigationContainer = document.createElement('div');
        clipNavigationContainer.classList.add('clip-list__nav');
        clipListContainer.appendChild(clipNavigationContainer);
        return clipListContainer;
    };
}