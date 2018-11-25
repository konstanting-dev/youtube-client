export default class SearchBox {
  init(container) {
    this.container = container;
    this.keywordValue = "";
    this.render();
  }
  set keyword(word){
    this.keywordValue = word;
  };
  get keyword(){
    return this.keywordValue;
  };

  constructor(container) {
    this.init(container);
  };

  render(){
    this.container.innerHTML = `
        <input class="search-box__input" id="keyword" type="text" value="${this.keywordValue}" placeholder="Enter the keyword">
        <button class="search-box__button" id="search"><i class="material-icons">search</i></button>
      `;
  };
}
