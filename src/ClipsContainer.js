import {getClipList, getViewCount} from "./youtubeRestClient";
import ClipNavigation from "./ClipNavigation";
import ClipList from "./ClipList";
import Clip from "./Clip";
import {clipsChunkSize} from "./constants";

export default class ClipsContainer {

  init(container) {
    this.container = container;
    this.clips = [];
    this.clipsPerPageCount = 0;
    this.pagesCount = 1;
    this.chunkSize = clipsChunkSize;
    this.render();
  }

  set Clips(clips){
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

  constructor(container) {
    this.init(container);
  };

  static markup(){
    return `
            <div class="clip-list__wrapper"></div>
            <div class="clip-list__nav"></div>
      `
  };

  updateWrapper(newPageNumber){
    let clipListContainerWidth = this.container.offsetWidth;

    if(newPageNumber > this.clipNavigation.currentPage) this.wrapperElement.style.transform = `translateX(${-clipListContainerWidth}px)`;
    else this.wrapperElement.style.transform = `translateX(${clipListContainerWidth}px)`;
    this.clipNavigation.currentPage = newPageNumber;
    let promise = new Promise( (resolve, reject) => {
      setTimeout( () => {
        while (this.wrapperElement.firstChild) {
          this.wrapperElement.removeChild(this.wrapperElement.firstChild);
        }
        resolve();
      }, 700);
    });

    promise.then(() =>{
      this.clipList.pageClips = this.clips.slice((newPageNumber - 1) * this.clipsPerPageCount, newPageNumber * this.clipsPerPageCount);
      this.wrapperElement.style.transform = `translateX(0px)`;
    });
  };

  updateListSettings(){
    let clipListContainerWidth = this.container.offsetWidth;
    if(clipListContainerWidth > 425){
      let clipPerPageCount = Math.floor(clipListContainerWidth / 400);
      let clipMargin = (clipListContainerWidth - 400 * clipPerPageCount) / (clipPerPageCount * 2);
      if(clipMargin < 12.5){
        clipPerPageCount--;
      }

      if(clipPerPageCount === 1) this.wrapperElement.classList.add('clip-list__wrapper_content-center');

      if(clipPerPageCount !== this.clipsPerPageCount){

        if(this.clipsPerPageCount === 1) this.wrapperElement.classList.remove('clip-list__wrapper_content-center');

        while (this.wrapperElement.firstChild) {
          this.wrapperElement.removeChild(this.wrapperElement.firstChild);
        }

        this.clipList.pageClips = this.clips.slice((this.clipNavigation.currentPage - 1) * clipPerPageCount, this.clipNavigation.currentPage * clipPerPageCount);
      }
      this.clipsPerPageCount = clipPerPageCount;
      let pageCount = Math.floor(this.clips.length / clipPerPageCount);
      if(pageCount * clipPerPageCount !== this.clips.length) pageCount++;
      this.pagesCount = pageCount;
      this.clipNavigation.pagesCount = this.pagesCount;
    }
  };

  loadClips(keyword, chunkSize, pageNumber){
    getClipList(keyword, chunkSize).then((response) => {
      let newClips = JSON.parse(response).items;
      this.Clips = newClips.slice(chunkSize - clipsChunkSize, chunkSize);
      this.updateListSettings();
      this.updateWrapper(pageNumber);
    })
      .catch(function(err){
        console.error(err);
      });
  };

  render(){
    this.container.innerHTML = ClipsContainer.markup();
    this.wrapperElement = this.container.querySelector('.clip-list__wrapper');
    this.clipList = new ClipList(this.wrapperElement);
    this.navigationElement = this.container.querySelector('.clip-list__nav');
    this.clipNavigation = new ClipNavigation(this.navigationElement);

    let keyword = "";

    this.container.addEventListener('getClips', (event) => {
      this.clips.length = 0;
      this.chunkSize = clipsChunkSize;
      keyword = event.detail.keyword;
      this.loadClips(event.detail.keyword, this.chunkSize, 1);
    });

    this.navigationElement.addEventListener('click', (event) => {
      console.log(event.target);
      if(event.target.className === 'dot'){
        let newPage = parseInt(event.target.innerText, 10);
        if(newPage === this.pagesCount){
          this.chunkSize += clipsChunkSize;
          this.loadClips(keyword, this.chunkSize, newPage);
        }else{
          this.updateWrapper(newPage);
        }
      }
    });

    let down = false;
    let mouseX = 0;
    let translateX = 0;

    this.wrapperElement.addEventListener('mousedown', function(event){
      event.preventDefault();
      down = true;
      mouseX = event.clientX;
      return false;
    });

    this.wrapperElement.addEventListener('touchstart', function(event){
      event.preventDefault();
      down = true;
      mouseX = event.touches[0].pageX;
      console.log("Touches "+event.touches.length);
      return false;
    });

    this.wrapperElement.addEventListener('mousemove', (event) => {
      if(down){
        let newMouseX = event.clientX;
        translateX = newMouseX - mouseX;
        this.wrapperElement.style.transform = `translateX(${translateX}px)`;
      }
    });

    this.wrapperElement.addEventListener('touchmove', (event) => {
      if(down){
        let newMouseX = event.touches[0].pageX;
        translateX = newMouseX - mouseX;
        this.wrapperElement.style.transform = `translateX(${translateX}px)`;
      }
    });

    this.wrapperElement.addEventListener('mouseup', (event) => {
      if(down){
        let currPage = this.clipNavigation.currentPage;
        if(translateX < 0) this.updateWrapper(currPage + 1);
        else if(translateX > 0 && currPage !== 1) this.updateWrapper(currPage - 1);
        down = false;
      }
    });

    this.wrapperElement.addEventListener('touchend', (event) => {
      if(down){
        let currPage = this.clipNavigation.currentPage;
        if(translateX < 0) this.updateWrapper(currPage + 1);
        else if(translateX > 0 && currPage !== 1) this.updateWrapper(currPage - 1);
        down = false;
      }
    });
  };
}
