import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import { GLOBALS } from "./utils/enums"
import './styles/reset.css'

ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(GLOBALS.TITLE, document.querySelector('title'))