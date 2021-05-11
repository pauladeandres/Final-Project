import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './layout/Navigation/Navigation'
import AdminService from '../service/auth.service'

import Routes from './routes/Routes'
import Alert from './shared/Alert/Alert'

class App extends Component {

  constructor() {
    super()
      this.state= {
        loggedUser: undefined,
        showAlert: false,
        alertText: ''
      }
    this.authService = new AdminService()
      
    }

  handleAlert(alertText, showAlert = true) {
    this.setState({ showAlert, alertText })
  }

  render() {

    return (
      <main>
        <Navigation handleAlert={alertText => this.handleAlert(alertText)}/>
        <Routes handleAlert={alertText => this.handleAlert(alertText)}/>

        <Alert handleAlert={(alertText, showAlert) => this.handleAlert(alertText, showAlert)} show={this.state.showAlert} text={this.state.alertText} />
      </main>
    )
  }
}

export default App
