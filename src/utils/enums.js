export const GLOBALS = Object.freeze({
  TITLE: 'Thumbnail Viewer'
})

export const createDimensionConfig = (width, height, title) => ({ width, height, title })

export const YTConfig = Object.freeze([
  createDimensionConfig(290, 163, 'Monitor'),
  createDimensionConfig(276, 155, 'Laptop'),
  createDimensionConfig(168, 94, 'Up Next'),
  createDimensionConfig(100, 56, 'Playlist')
])