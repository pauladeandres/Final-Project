import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Routes from './routes/Routes'

class App extends Component {

  constructor() {
    super()
  
  }

  render() {

    return (
      <main>
        <Routes />
      </main>
    )
  }
}

export default App