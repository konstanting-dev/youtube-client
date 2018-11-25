!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);var i=function(e,t){return new Promise(function(n,i){var r=new XMLHttpRequest;r.open(e,t),r.setRequestHeader("Content-type","application/json; charset=utf-8"),r.onload=function(){this.status>=200&&this.status<300?n(r.response):i(new Error("Status: ".concat(this.status,", Error: ").concat(r.statusText)))},r.onerror=function(){i(new Error("Status: ".concat(this.status,", Error: ").concat(r.statusText)))},r.send()})};function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init(t)}return a(e,[{key:"init",value:function(e){this.container=e,this.pagesCountValue=0,this.currentPageValue=0,this.render()}},{key:"pagesCount",set:function(e){this.pagesCountValue=e,this.render()},get:function(){return this.pagesCountValue}},{key:"currentPage",set:function(e){this.currentPageValue=e,this.render()},get:function(){return this.currentPageValue}}]),a(e,[{key:"render",value:function(){for(var e="",t=0;t<this.pagesCountValue;t+=1)e+='\n        <span class="dot'.concat(this.currentPageValue-1===t?" dot_active":"",'" title="').concat(t+1,'">').concat(t+1,"</span>\n      ");this.container.innerHTML=e}}]),e}();n(1);function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&c(e.prototype,t),n&&c(e,n),e}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.clipsPerPage=[],this.init(t)}return o(e,[{key:"init",value:function(e){this.container=e,this.render()}}]),o(e,[{key:"render",value:function(){for(var e=0,t=this.clipsPerPage.length;e<t;e+=1)this.container.appendChild(this.clipsPerPage[e].renderClip())}},{key:"pageClips",set:function(e){this.clipsPerPage=e.slice(),this.render()}}]),e}();n(2);function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var p=function(){function e(t,n,i,r,a){var s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,c=arguments.length>6?arguments[6]:void 0;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=t,this.title=n,this.screenshotUrl=i,this.channel=r,this.uploadDate=a,this.viewsCount=s,this.description=c}return function(e,t,n){t&&u(e.prototype,t),n&&u(e,n)}(e,[{key:"renderClip",value:function(){var e=document.createElement("div");return e.classList.add("clip"),e.innerHTML='\n                <figure class="clip__screenshot">\n                    <img src="'.concat(this.screenshotUrl,'" alt="">\n                    <figcaption class="clip__caption">\n                        <a class="clip__link" href="https://www.youtube.com/watch/?v=').concat(this.id,'" target="_blank">').concat(this.title,'</a>\n                    </figcaption>\n                </figure>\n                <div class="clip__info">\n                    <div class="clip__item">\n                        <div class="clip__icon"><i class="material-icons">person</i></div>\n                        <div class="clip__value">').concat(this.channel,'</div>\n                    </div>\n                    <div class="clip__item">\n                        <div class="clip__icon"><i class="material-icons">date_range</i></div>\n                        <div class="clip__value">').concat(new Date(this.uploadDate).toLocaleDateString("en-US"),'</div>\n                    </div>\n                    <div class="clip__item">\n                        <div class="clip__icon"><i class="material-icons">face</i></div>\n                        <div class="clip__value">').concat(this.viewsCount,' views</div>\n                    </div>\n                    <p class="clip__description">\n                        ').concat(this.description,"\n                    </p>\n                </div>\n                \n        "),e}},{key:"videoId",get:function(){return this.id}},{key:"views",set:function(e){this.viewsCount=e}}]),e}();function h(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function d(e,t,n){return t&&h(e.prototype,t),n&&h(e,n),e}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init(t)}return d(e,[{key:"init",value:function(e){this.container=e,this.keywordValue="",this.render()}},{key:"keyword",set:function(e){this.keywordValue=e},get:function(){return this.keywordValue}}]),d(e,[{key:"render",value:function(){this.container.innerHTML='\n        <input class="search-box__input" id="keyword" type="text" value="'.concat(this.keywordValue,'" placeholder="Enter the keyword">\n        <button class="search-box__button" id="search"><i class="material-icons">search</i></button>\n      ')}}]),e}(),v=getComputedStyle(document.body),g=parseInt(v.getPropertyValue("--clip-width").slice(0,-2),10);function m(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function y(e,t,n){return t&&m(e.prototype,t),n&&m(e,n),e}var w=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init(t)}return y(e,[{key:"init",value:function(e){this.container=e,this.clips=[],this.clipsPerPageCount=0,this.chunkSize=15,this.render()}},{key:"Clips",set:function(e){this.clips=this.clips.concat(e.map(function(e){var t=e.snippet,n=t.title,r=t.publishedAt,a=t.description,s=t.thumbnails,c=t.channelTitle,o=e.id.videoId,l=new p(o,n,s.high.url,c,r,0,a);return function(e){return i("GET","https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyDXwwh51G-zqD-zbMkzMjQpm_Mg8zRUf4Y&id=".concat(e))}(o).then(function(e){var t=JSON.parse(e);l.viewsCount=t.items[0].statistics.viewCount}),l}))}}]),y(e,[{key:"updateWrapper",value:function(e){var t=this,n=this.container.offsetWidth;e>this.clipNavigation.currentPage?this.wrapperElement.style.transform="translateX(".concat(-n,"px)"):e<this.clipNavigation.currentPage&&(this.wrapperElement.style.transform="translateX(".concat(n,"px)")),this.clipNavigation.currentPage=e,new Promise(function(e){setTimeout(function(){for(;t.wrapperElement.firstChild;)t.wrapperElement.removeChild(t.wrapperElement.firstChild);e()},700)}).then(function(){t.clipList.pageClips=t.clips.slice((e-1)*t.clipsPerPageCount,e*t.clipsPerPageCount),t.wrapperElement.style.transform="translateX(0px)"})}},{key:"updateListSettings",value:function(){var e,t=this.container.offsetWidth;t>g+15?(e=Math.floor(t/g),(t-g*e)/(2*e)<7.5&&(e-=1)):e=1;var n=Math.floor(this.clips.length/e);if(n*e!==this.clips.length&&(n+=1),1===e&&this.wrapperElement.classList.add("clip-list__wrapper_content-center"),e!==this.clipsPerPageCount){for(1===this.clipsPerPageCount&&this.wrapperElement.classList.remove("clip-list__wrapper_content-center");this.wrapperElement.firstChild;)this.wrapperElement.removeChild(this.wrapperElement.firstChild);this.clipNavigation.currentPage>n?(this.clipList.pageClips=this.clips.slice((n-1)*e,n*e),this.clipNavigation.currentPage=n):this.clipList.pageClips=this.clips.slice((this.clipNavigation.currentPage-1)*e,this.clipNavigation.currentPage*e)}this.clipsPerPageCount=e,this.clipNavigation.pagesCount=n}},{key:"loadClips",value:function(e,t,n){var r=this;(function(e,t){return i("GET","https://www.googleapis.com/youtube/v3/search?maxResults=".concat(t,"&part=snippet&type=video&key=AIzaSyDXwwh51G-zqD-zbMkzMjQpm_Mg8zRUf4Y&q=").concat(e))})(e,t).then(function(e){var i=JSON.parse(e).items;r.Clips=i.slice(t-15,t),r.updateListSettings(),r.updateWrapper(n)}).catch(function(e){r.clipList.innerText=e})}},{key:"render",value:function(){this.container.innerHTML=e.markup(),this.wrapperElement=this.container.querySelector(".clip-list__wrapper"),this.clipList=new l(this.wrapperElement),this.navigationElement=this.container.querySelector(".clip-list__nav"),this.clipNavigation=new s(this.navigationElement),this.searchInputElement=this.container.querySelector(".search-box"),this.searchInput=new f(this.searchInputElement),this.addEventListeners()}},{key:"addEventListeners",value:function(){var e=this;document.getElementById("keyword").addEventListener("keypress",function(t){13===t.keyCode&&(e.searchInput.keyword=t.target.value,e.container.dispatchEvent(new CustomEvent("getClips")))}),document.getElementById("search").addEventListener("click",function(){e.searchInput.keyword=document.getElementById("keyword").value,e.container.dispatchEvent(new CustomEvent("getClips"))}),this.container.addEventListener("getClips",function(){e.clips.length=0,e.chunkSize=15,e.clipNavigation.currentPageValue=0,e.loadClips(e.searchInput.keyword,e.chunkSize,1)}),this.navigationElement.addEventListener("click",function(t){if("dot"===t.target.className){var n=parseInt(t.target.innerText,10);n===e.clipNavigation.pagesCount?(e.chunkSize+=15,e.loadClips(e.searchInput.keyword,e.chunkSize,n)):e.updateWrapper(n)}});var t=!1,n=0,i=0;this.wrapperElement.addEventListener("mousedown",function(e){return e.preventDefault(),t=!0,n=e.clientX,!1}),this.wrapperElement.addEventListener("touchstart",function(e){return e.preventDefault(),t=!0,n=e.touches[0].pageX,!1}),this.container.addEventListener("mousemove",function(r){if(t){var a=r.clientX;i=a-n,e.wrapperElement.style.left="".concat(i,"px")}}),this.container.addEventListener("touchmove",function(r){if(t){var a=r.touches[0].pageX;i=a-n,e.wrapperElement.style.left="translateX(".concat(i,"px)")}}),this.container.addEventListener("mouseup",function(){if(t){var n=e.clipNavigation.currentPage;e.wrapperElement.style.left="0px",i<0?e.updateWrapper(n+1):i>0&&1!==n&&e.updateWrapper(n-1),t=!1}}),this.container.addEventListener("touchend",function(){if(t){var n=e.clipNavigation.currentPage;e.wrapperElement.style.left="0px",i<0?e.updateWrapper(n+1):i>0&&1!==n&&e.updateWrapper(n-1),t=!1}})}}],[{key:"markup",value:function(){return'\n            <div class="search-box"></div>\n            <div class="clip-list__wrapper"></div>\n            <div class="clip-list__nav"></div>\n      '}}]),e}(),E=document.createElement("main"),_=document.createElement("div");_.classList.add("clip-list");var b=document.createElement("h1");b.innerText="YouTube Client",E.appendChild(b),E.appendChild(_),document.body.appendChild(E);var k,C=new w(document.querySelector(".clip-list"));window.addEventListener("resize",function(){k||(k=setTimeout(function(){k=null,C.updateListSettings()},66))},!1)}]);