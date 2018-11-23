const makeRequest = (method, url) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};

export const getClipList = (query) => {
    return makeRequest('GET',
        'https://www.googleapis.com/youtube/v3/search?maxResults=15&part=snippet&type=video&key=AIzaSyDXwwh51G-zqD-zbMkzMjQpm_Mg8zRUf4Y&q='+query);
};

export const getViewCount = (videoId) => {
    return makeRequest('GET',
        'https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyDXwwh51G-zqD-zbMkzMjQpm_Mg8zRUf4Y&id='+videoId);
};