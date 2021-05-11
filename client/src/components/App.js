import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './layout/Navigation/Navigation'
import Home from './pages/Home/Home'

import Routes from './routes/Routes'
import AuthService from '../service/auth.service'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedUser: undefined }
    this.authService = new AuthService()

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
        <Navigation storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />
        <Routes storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />
      </main>
    )
  }
}

export default App
