/**
 * @param {string} src
 * @desc Programmatically load an image.
 * @return {Promise} Resolves with original src.
 */
export const loadImage = src => new Promise(resolve => {
  const image = new Image()
  image.onload = () => resolve(src)
  image.setAttribute('src', src)
})

/**
 * @desc A wrapper for executing anon functions safely.
 * @param {function} callback
 */
export const tryCatch = callback => {
  try {
    callback()
  } catch (err) {
    console.error(err)
  }
}