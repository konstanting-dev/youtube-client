import "./sass/clipList.scss";

export default class ClipList {
    init(container) {
      this.container = container;
      this.render();
    }
    constructor(container) {
        this.clipsPerPage = [];
        this.init(container);
    }

    set pageClips(clips){
      this.clipsPerPage = clips.slice();
      this.render();
    }

    render(){
      for(let i = 0, len = this.clipsPerPage.length; i < len; i++){
        this.container.appendChild(this.clipsPerPage[i].renderClip());
      }
    };
}
