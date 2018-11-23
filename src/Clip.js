import "./sass/clip.scss";

export default class Clip {


    constructor(id, title, screenshotUrl, channel, uploadDate, viewsCount = 0, description){
        this.id = id;
        this.title = title;
        this.screenshotUrl = screenshotUrl;
        this.channel = channel;
        this.uploadDate = uploadDate;
        this.viewsCount = viewsCount;
        this.description = description;
    }

    get videoId(){
      return this.id;
    };

    set views(count){
      this.viewsCount = count;
    };


    renderClip(){
        let clipContainer = document.createElement('div');
        clipContainer.classList.add('clip');
        clipContainer.innerHTML = `
                <figure class="clip__screenshot">
                    <img src="${this.screenshotUrl}" alt="">
                    <figcaption class="clip__caption">${this.title}</figcaption>
                </figure>
                <div class="clip__info">
                    <div class="clip__item">
                        <div class="clip__icon"></div>
                        <div class="clip__value">${this.channel}</div>
                    </div>
                    <div class="clip__item">
                        <div class="clip__icon"></div>
                        <div class="clip__value">${this.uploadDate}</div>
                    </div>
                    <div class="clip__item">
                        <div class="clip__icon"></div>
                        <div class="clip__value">${this.viewsCount}</div>
                    </div>
                    <p class="clip__description">
                        ${this.description}
                    </p>
                </div>
                
        `;
        return clipContainer;
    };
}