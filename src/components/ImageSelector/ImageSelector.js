import React, { useState} from 'react'
import Button from '@material-ui/core/Button'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import { tryCatch } from '../../utils'
import './ImageSelector.scss'

const inputId = 'image-selector-input'

/**
 * @param {string} className
 * @param {function} setFile
 * @desc Upload and de-select an image.
 */
const ImageSelector = ({ className = '', setFile }) => {

  // COMPONENT STATE ----------------------------------------------------------

  const [filename, setFilename] = useState('')

  // HANDLERS -----------------------------------------------------------------

  /**
   * @desc Change handler for settign the file and filename.
   */
  const onChange = e => {
    tryCatch(() => {
      const file = e.target.files[0]
      setFile(file)
      setFilename(file.name)
    })
  }

  /**
   * @desc Resets the file and filename.
   */
  const onClear = () => {
    tryCatch(() => {
      setFile(null)
      setFilename('')
    })
  }

  const inputProps = {
    id: inputId,
    type: 'file',
    style: {
      display: 'none'
    },
    multiple: false,
    accept: 'image/*',
    value: '',
    onChange
  }

  const buttonProps = {
    classes: {
      root: 'button'
    },
    variant: 'contained',
    component: 'span'
  }

  /**
   * @desc If filename is truthy, render the clear button.
   */
  const renderClearButton = () => {
    if (filename) {
      return (
        <Button {...buttonProps} onClick={onClear}>
          <ClearRoundedIcon />
        </Button>
      )
    }
    return null
  }

  return (
    <div className={`${className} image-selector`}>
      <div>
        {filename || ''}
      </div>
      <label htmlFor={inputId}>
        <input {...inputProps} />
        <Button {...buttonProps}>
          <PhotoCameraIcon />
        </Button>
      </label>
      {renderClearButton()}
    </div>
  )
}

export default ImageSelector