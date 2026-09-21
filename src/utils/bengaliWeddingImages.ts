const localWeddingImages = [
  '/gallery/test1.jpg',
  '/gallery/test2.jpeg',
  '/gallery/test3.jpg',
  '/gallery/test4.jpg',
];

export const bengaliWeddingImage = (
  _width: number,
  _height: number,
  _tags: string,
  lock: number,
) => localWeddingImages[Math.abs(lock) % localWeddingImages.length];
