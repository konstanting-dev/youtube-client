const makeRequest = (method, url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  function requestListener() {
    if (this.status >= 200 && this.status < 300) {
      resolve(xhr.response);
    } else {
      reject(new Error(`Status: ${this.status}, Error: ${xhr.statusText}`));
    }
  }
  function errorHandler() {
    reject(new Error(`Status: ${this.status}, Error: ${xhr.statusText}`));
  }
  xhr.open(method, url);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = requestListener;
  xhr.onerror = errorHandler;
  xhr.send();
});

export const getClipList = (query, nextPageToken) => makeRequest(
  'GET',
  `https://www.googleapis.com/youtube/v3/search?maxResults=15&pageToken=${nextPageToken}&part=snippet&type=video&key=AIzaSyDXwwh51G-zqD-zbMkzMjQpm_Mg8zRUf4Y&q=${query}`,
);

export const getViewCount = videoId => makeRequest(
  'GET',
  `https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyDXwwh51G-zqD-zbMkzMjQpm_Mg8zRUf4Y&id=${videoId}`,
);
