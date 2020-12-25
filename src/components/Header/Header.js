import React from 'react'
import ImageRoundedIcon from '@material-ui/icons/ImageRounded'
import { GLOBALS} from '../../utils/enums'
import './Header.scss'

/**
 * @desc Header is displayed at the top of the page.
 */
const Header = () => {

  // COMPONENTS ---------------------------------------------------------------

  return (
    <div className={'header display-grid app-label'}>
      <ImageRoundedIcon />
      {GLOBALS.TITLE}
    </div>
  )
}

export default Header