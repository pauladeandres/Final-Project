import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navigation from './layout/Navigation/Navigation'
import Routes from './routes/Routes'
import AuthService from '../service/auth.service'
import Alert from './shared/Alert/Alert'
import OrdersService from '../service/order.service'

class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedUser: null,
      showAlert: false,
      alertText: '',
      orderNumber: 0
    }
    this.authService = new AuthService()
    this.orderNumber = new OrdersService()
  }

  handleAlert(alertText, showAlert = true) {
    this.setState({ showAlert, alertText })
  }

  storeUser = loggedUser => this.setState({ loggedUser })

  fetchUser = () => {
    this.authService
      .isloggedin()
      .then(response => this.setState({loggedUser: response.data }))
      .catch(() => this.setState({ loggedUser: undefined }))
  }

  componentDidMount() {
    this.fetchUser()
  }

  updateCartNumber() {
    this.orderNumber
      .getUserOrder()
      .then(response => this.setState({orderNumber: response.data[0].products.length}))
      .catch(err => console.log(err))
  }

  render() {

    return (
      this.state.loggedUser === null ? "buscando user" :(
      <main>
        <Navigation handleAlert={alertText => this.handleAlert(alertText)}
          storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} orderNumber={this.state.orderNumber}/>

        <Routes storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} handleAlert={alertText => this.handleAlert(alertText)} updateCartNumber={() => this.updateCartNumber()}/>

        <Alert handleAlert={(alertText, showAlert) => this.handleAlert(alertText, showAlert)} show={this.state.showAlert} text={this.state.alertText} />
      
      </main >)
    )
  }
}

export default App
