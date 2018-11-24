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
        <input class="search-box__input" id="keyword" type="search" value="${this.keywordValue}" placeholder="Введите запрос">
      `;
  };
}
