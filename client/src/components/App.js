import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './layout/Navigation/Navigation'
import AdminService from '../service/auth.service'

import Routes from './routes/Routes'

class App extends Component {

  constructor() {
    super()
      this.state= {
        loggedUser: undefined
      }
    this.authService = new AdminService()
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
