import ClipsContainer from '../src/components/ClipsContainer';
import * as api from '../src/youtubeRestClient';
import { clips } from '../__mocks__/youtubeRestClient';

Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get() {
      return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
    },
  },
  offsetTop: {
    get() {
      return parseFloat(window.getComputedStyle(this).marginTop) || 0;
    },
  },
  offsetHeight: {
    get() {
      return parseFloat(window.getComputedStyle(this).height) || 0;
    },
  },
  offsetWidth: {
    get() {
      return parseFloat(window.getComputedStyle(this).width) || 0;
    },
  },
});

api.getClipList = jest.fn().mockImplementation(
  (query, maxResults) => new Promise((resolve, reject) => {
    if (query) {
      resolve(JSON.stringify(clips));
    } else {
      reject('No query');
    }
  }),
);

api.getViewCount = jest.fn().mockImplementation(
  id => new Promise((resolve, reject) => {
    if (id) {
      const viewsObject = JSON.stringify({
        items: [
          {
            statistics: {
              viewCount: id,
            },
          },
        ],
      });
      resolve(viewsObject);
    } else {
      reject('No id');
    }
  }),
);

const main = document.createElement('main');

const clipListElement = document.createElement('div');
clipListElement.classList.add('clip-list');
const headingtElement = document.createElement('h1');
headingtElement.innerText = 'YouTube Client';
main.appendChild(headingtElement);
main.appendChild(clipListElement);
document.body.appendChild(main);

const clipListContainer = new ClipsContainer(document.querySelector('.clip-list'));

describe('ClipsContainer', () => {
  it('should be rendered in div with clip-list class', () => {
    expect(document.querySelector('.clip-list')).not.toBe(null);
  });

  it('should render SearchBox, ClipList and ClipNaviagtion containers', () => {
    expect(document.querySelector('.search-box')).not.toBe(null);
    expect(document.querySelector('.clip-list__wrapper')).not.toBe(null);
    expect(document.querySelector('.clip-list__nav')).not.toBe(null);
  });

  it('should contain empty navigation after initial load', () => {
    expect(clipListContainer.navigationElement.innerHTML).toBe('');
  });

  it('should contain empty list of clips after initial load', () => {
    expect(clipListContainer.wrapperElement.innerHTML).toBe('');
  });

  it('should set clips', () => {
    clipListContainer.Clips = clips.items;
    expect(clipListContainer.Clips).not.toHaveLength(0);
  });

  it('should load clips', () => {
    const clipsSetterSpy = jest.spyOn(clipListContainer, 'Clips', 'set');
    clipListContainer.searchInput.keyword = 'rsschool';
    clipListContainer.chunkSize = 15;
    clipListContainer.clipNavigation.currentPageValue = 0;
    clipListContainer
      .loadClips(clipListContainer.searchInput.keyword, clipListContainer.chunkSize, 1)
      .then(() => {
        expect(clipsSetterSpy).toHaveBeenCalledTimes(1);
        expect(clipListContainer.Clips).not.toHaveLength(0);
      });
  });

  it('should change pages', () => {
    clipListContainer.Clips = clips.items;
    let prevCLipListState;
    clipListContainer
      .updateWrapper(1)
      .then(() => {
        prevCLipListState = clipListContainer.clipList.pageClips.slice();
      })
      .then(() => {
        clipListContainer.updateWrapper(2);
      })
      .then(() => {
        expect(clipListContainer.clipNavigation.currentPage).toBe(2);
        expect(clipListContainer.clipList.pageClips).not.toEqual(
          expect.arrayContaining(prevCLipListState),
        );
      });
  });

  it('should update List settings after resize', () => {
    document.querySelector('.clip-list').style.width = '1600px';
    clipListContainer.updateListSettings();
    expect(clipListContainer.clipsPerPageCount).toBe(3);

    document.querySelector('.clip-list').style.width = '1200px';
    clipListContainer.updateListSettings();
    expect(clipListContainer.clipsPerPageCount).toBe(2);
  });
});
