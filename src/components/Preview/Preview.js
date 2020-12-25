import React from 'react'
import './Preview.scss'

/**
 * @param {object} config
 * @param {string} url
 * @desc If url is truthy, render a preview of the image with the given config.
 */
const Preview = ({ config = {}, url = '' }) => {

  // CONSTANTS ----------------------------------------------------------------

  const { width, height, title } = config

  // COMPONENTS ---------------------------------------------------------------

  if (!url) return null

  /**
   * @desc Renders an image with the given config.
   */
  const renderImg = () => {
    const props = {
      className: 'img',
      style: {
        backgroundImage: `url(${url})`,
        width, height
      }
    }
    return (<div {...props} />)
  }

  return (
    <div className={'preview'}>
      <div className={'title'}>
        {title || ''}
      </div>
      {renderImg()}
    </div>
  )
}

export default Preview