import ClipsContainer from '../ClipsContainer';

const main = document.createElement('main');

const clipListElement = document.createElement('div');
clipListElement.classList.add('clip-list');
const headingtElement = document.createElement('h1');
headingtElement.innerText = 'YouTube Client';
main.appendChild(headingtElement);
main.appendChild(clipListElement);
document.body.appendChild(main);

describe('ClipsContainer tests', () => {
  it('Test ClipsContainer markup function', () => {
    const clipListContainer = new ClipsContainer(document.querySelector('.clip-list'));
    expect(ClipsContainer.markup).toBeInstanceOf(Function);
  });
});
