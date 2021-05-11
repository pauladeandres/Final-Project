import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './layout/Navigation/Navigation'
import Home from './pages/Home/Home'

import Routes from './routes/Routes'

class App extends Component {

  constructor() {
    super()
  
  }

  render() {

    return (
      <main>
        <Navigation />
        <Routes />
      </main>
    )
  }
}

export default App