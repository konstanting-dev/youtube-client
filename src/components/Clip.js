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
                    <figcaption class="clip__caption">
                        <a class="clip__link" href="https://www.youtube.com/watch/?v=${this.id}" target="_blank">${this.title}</a>
                    </figcaption>
                </figure>
                <div class="clip__info">
                    <div class="clip__item">
                        <div class="clip__icon"><i class="material-icons">person</i></div>
                        <div class="clip__value">${this.channel}</div>
                    </div>
                    <div class="clip__item">
                        <div class="clip__icon"><i class="material-icons">date_range</i></div>
                        <div class="clip__value">${new Date(this.uploadDate).toLocaleDateString('en-US')}</div>
                    </div>
                    <div class="clip__item">
                        <div class="clip__icon"><i class="material-icons">face</i></div>
                        <div class="clip__value">${this.viewsCount} views</div>
                    </div>
                    <p class="clip__description">
                        ${this.description}
                    </p>
                </div>
                
        `;
        return clipContainer;
    };
}
