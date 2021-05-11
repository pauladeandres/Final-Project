import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './layout/Navigation/Navigation'
import AdminService from '../service/auth.service'

import Routes from './routes/Routes'
import AuthService from '../service/auth.service'
import Alert from './shared/Alert/Alert'

class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedUser: undefined,
      showAlert: false,
      alertText: ''
    }
    this.authService = new AuthService()

  }

  handleAlert(alertText, showAlert = true) {
    this.setState({ showAlert, alertText })
  }

  storeUser = loggedUser => this.setState({ loggedUser })

  fetchUser = () => {
    this.authService
      .isloggedin()
      .then(response => this.setState({ loggedUser: response.data }))
      .catch(() => this.setState({ loggedUser: undefined }))
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {

    return (
      <main>
        <Navigation handleAlert={alertText => this.handleAlert(alertText)}
          storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />

        <Routes handleAlert={alertText => this.handleAlert(alertText)}
          storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />

        <Alert handleAlert={(alertText, showAlert) => this.handleAlert(alertText, showAlert)} show={this.state.showAlert} text={this.state.alertText} />
      </main >
    )
  }
}

export default App
