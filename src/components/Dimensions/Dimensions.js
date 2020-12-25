import React from 'react'
import { cloneDeep } from 'lodash'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RefreshIcon from '@material-ui/icons/Refresh'
import Dimension from './Dimension/Dimension'
import { createDimensionConfig, YTConfig } from '../../utils/enums'
import { tryCatch } from '../../utils'
import './Dimensions.scss'

/**
 * @param {[]} dimensions
 * @param {function} setDimensions
 * @desc Displays dimensions.
 */
const Dimensions = ({ dimensions, setDimensions }) => {

  // HANDLERS -----------------------------------------------------------------

  /**
   * @desc A HOF for updating the index-th dimension.
   */
  const updateDimension = index => (property, value, type = 'string', onChange) => {
    tryCatch(() => {
      const copy = cloneDeep(dimensions)
      let localValue = value.trim()
      if (type === 'int') {
        localValue = parseInt(value, 10)
        if (property === 'width') {
          localValue = Math.min(localValue, window.innerWidth / 2)
        } else if (property === 'height') {
          localValue = Math.min(localValue, window.innerHeight / 2)
        }
      }
      copy[index][property] = localValue
      setDimensions(copy)
      onChange(localValue.toString())
    })
  }

  /**
   * @desc A HOF for deleting a dimension.
   */
  const onDelete = index => () => {
    tryCatch(() => {
      const copy = cloneDeep(dimensions)
      copy.splice(index, 1)
      setDimensions(copy)
    })
  }

  /**
   * @desc Adds a dimension.
   */
  const onAdd = () => {
    tryCatch(() => {
      const copy = cloneDeep(dimensions)
      setDimensions([
        ...copy,
        createDimensionConfig(0, 0, '')
      ])
    })
  }

  /**
   * @desc Resets dimensions.
   */
  const onReset = () => {
    tryCatch(() => {
      setDimensions(YTConfig)
    })
  }

  // COMPONENTS ---------------------------------------------------------------

  const buttonProps = {
    classes: {
      root: 'button'
    },
    variant: 'contained',
    component: 'span'
  }

  const dimensionElements = dimensions.map((props, i) => {
    const localProps = {
      ...props,
      update: updateDimension(i),
      onDelete: onDelete(i)
    }
    return (<Dimension key={`${props.title}-${i}`} {...localProps} />)
  })

  return (
    <div className={'dimensions-container'}>
      <div className={'app-label'}>
        Dimensions
      </div>
      <div className={'dimensions special-scroll'}>
        {dimensionElements}
      </div>
      <div className={'buttons display-grid'}>
        <Button {...buttonProps} onClick={onReset}>
          <RefreshIcon />
        </Button>
        <Button {...buttonProps} onClick={onAdd}>
          <AddIcon />
        </Button>
      </div>
    </div>
  )
}

export default Dimensions