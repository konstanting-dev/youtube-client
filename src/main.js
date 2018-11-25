import './app.scss';
import ClipsContainer from './components/ClipsContainer';


const main = document.createElement('main');


const clipListElement = document.createElement('div');
clipListElement.classList.add('clip-list');
const headingtElement = document.createElement('h1');
headingtElement.innerText = 'YouTube Client';
main.appendChild(headingtElement);
main.appendChild(clipListElement);
document.body.appendChild(main);
const clipListContainer = new ClipsContainer(document.querySelector('.clip-list'));

let resizeTimeout;

function actualResizeHandler() {
  clipListContainer.updateListSettings();
}

function resizeThrottler() {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();
    }, 66);
  }
}

window.addEventListener('resize', resizeThrottler, false);
