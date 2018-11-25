export const clipsChunkSize = 15;

const style = getComputedStyle(document.body);
export const clipWidth = parseInt(style.getPropertyValue('--clip-width').slice(0, -2), 10);

export const minClipMargin = 15;
