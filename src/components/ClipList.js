import '../sass/clipList.scss';

export default class ClipList {
  init(container) {
    this.container = container;
    this.render();
  }

  constructor(container) {
    this.clipsPerPage = [];
    this.init(container);
  }

  set pageClips(clips) {
    this.clipsPerPage = clips.slice();
    this.render();
  }

  render() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    for (let i = 0, len = this.clipsPerPage.length; i < len; i += 1) {
      this.container.appendChild(this.clipsPerPage[i].renderClip());
    }
  }
}
