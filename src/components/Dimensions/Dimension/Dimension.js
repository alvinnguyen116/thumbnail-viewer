import React, { useState } from 'react'
import { cloneDeep } from 'lodash'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import { tryCatch } from '../../../utils'
import './Dimension.scss'

/**
 * @param {int} width
 * @param {int} height
 * @param {string} title
 * @param {function} update
 * @param {function} onDelete
 * @desc A dimension form row.
 */
const Dimension = ({ width, height, title, update, onDelete }) => {

  // COMPONENT STATE ----------------------------------------------------------

  const [form, setForm] = useState({ width, height, title })

  // HANDLERS -----------------------------------------------------------------

  /**
   * @desc A change handler for a controlled form.
   */
  const onChange = (property, accessor = item => item) => obj => {
    tryCatch(() => {
      const copy = cloneDeep(form)
      copy[property] = accessor(obj)
      setForm(copy)
    })
  }

  /**
   * @desc On blur, update if the value exists, else reset the form.
   */
  const onBlur = (property, defaultValue, type = 'string') => e => {
    tryCatch(() => {
      const { value } = e.target
      if (value) {
        update(property, value, type, onChange(property))
      } else {
        onChange(property)(defaultValue)
      }
    })
  }

  const inputProps = {
    classes: {
      root: 'input'
    }
  }

  const props = {
    width: {
      ...inputProps,
      type: 'number',
      value: form.width,
      onChange: onChange('width', e => e.target.value),
      onBlur: onBlur('width', form.width, 'int')
    },
    height: {
      ...inputProps,
      type: 'number',
      value: form.height,
      onChange: onChange('height', e => e.target.value),
      onBlur: onBlur('height', form.height, 'int')
    },
    title: {
      ...inputProps,
      type: 'text',
      value: form.title,
      onChange: onChange('title', e => e.target.value),
      onBlur: onBlur('title', form.title)
    },
    button: {
      classes: {
        root: 'button'
      },
      color: 'secondary',
      variant: 'contained',
      component: 'span',
      size: 'small'
    }
  }

  return (
    <div className={'dimension-container display-grid'}>
      <div className={'dimension display-grid'}>
        <div className={'title display-grid'}>
          <Input {...props.title} />
          <span className={'bold'}>:</span>
        </div>
        <div className={'width-and-height display-grid'}>
          <Input {...props.width} />
          <span className={'bold'}>x</span>
          <Input {...props.height} />
        </div>
      </div>
      <Button {...props.button} onClick={onDelete}>
        <ClearRoundedIcon />
      </Button>
    </div>
  )
}

export default Dimension