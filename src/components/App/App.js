import React, { useState, useEffect } from 'react'
import { Transition} from 'react-transition-group'
import CircularProgress from '@material-ui/core/CircularProgress'
import { loadImage } from '../../utils'
import { YTConfig } from '../../utils/enums'
import Dimensions from '../Dimensions/Dimensions'
import ImageSelector from '../ImageSelector/ImageSelector'
import Preview from '../Preview/Preview'
import Header from '../Header/Header'
import './App.scss'

/**
 * @desc Main entry point to the app.
 */
const App = () => {

  // COMPONENT STATE ----------------------------------------------------------

  const [dimensions, setDimensions] = useState(YTConfig)
  const [file, setFile] = useState()
  const [url, setUrl] = useState('')

  // SIDE EFFECTS -------------------------------------------------------------

  /**
   * @desc Whenever file changes, update url.
   */
  useEffect(() => {
    url && URL.revokeObjectURL(url)
    if (file instanceof File) {
      const newUrl = URL.createObjectURL(file)
      loadImage(newUrl).then(setUrl)
    } else {
      setUrl('')
    }
  }, [file])

  // COMPONENTS ---------------------------------------------------------------

  /**
   * @desc Image Preview should appear 1s after the url is truthy.
   */
  const renderPreview = () => {
    const previewElements = dimensions
      .filter(({ width, height }) => (width > 0) && (height > 0))
      .map((config, i) => {
        const props = { config, url }
        return (<Preview {...props} />)
      })
    const transitionProps = {
      in: !!url,
      appear: true,
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: {
        enter: 1000
      }
    }
    return (
      <Transition {...transitionProps}>
        {
          state => (
            <div className={`preview-container special-scroll ${state}`}>
              {previewElements}
            </div>
          )
        }
      </Transition>
    )
  }

  /**
   * @desc Render a spinner if the file exists but not the URL.
   */
  const renderSpinner = () => {
    if (file && !url) {
      const props = {
        classes: {
          root: 'spinner'
        },
        variant: 'indeterminate'
      }
      return (<CircularProgress {...props} />)
    }
    return null
  }

  /**
   * @desc Body consists of a file selector and image previews.
   */
  const renderBody = () => {
    const props = {
      className: url ? 'top' : 'center',
      setFile, file
    }
    return (
      <div className={'body'}>
        <ImageSelector {...props} />
        {renderPreview()}
        {renderSpinner()}
      </div>
    )
  }

  /**
   * @desc Right rail consists of a dimension form.
   */
  const renderRightRail = () => {
    const props = { dimensions, setDimensions }
    return (<Dimensions {...props} />)
  }

  return (
    <div className={'app'}>
      <Header />
      <div className={'body-and-rails'}>
        {renderBody()}
        {renderRightRail()}
      </div>
    </div>
  )
}

export default App;
