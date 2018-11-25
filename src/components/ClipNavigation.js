export default class ClipNavigation {
  init(container) {
    this.container = container;
    this.pagesCountValue = 0;
    this.currentPageValue = 0;
    this.render();
  }
  set pagesCount(count){
    this.pagesCountValue = count;
    this.render();
  };
  get pagesCount(){
    return this.pagesCountValue;
  };
  set currentPage(page){
    this.currentPageValue = page;
    this.render();
  };
  get currentPage(){
    return this.currentPageValue;
  };
  constructor(container) {
    this.init(container);
  };

  render(){
    let html = '';
    for(let i = 0; i < this.pagesCountValue; i++){
      html += `
        <span class="dot${this.currentPageValue - 1 === i ? ' dot_active' : ''}" title="${i + 1}">${i + 1}</span>
      `;
    }
    this.container.innerHTML = html;
  };
}
