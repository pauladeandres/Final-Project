import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navigation from './layout/Navigation/Navigation'
import Routes from './routes/Routes'
import AuthService from '../service/auth.service'
import Alert from './shared/Alert/Alert'
import OrdersService from '../service/order.service'
import CategoryService from '../service/category.service'
import Sidebar from './layout/Sidebar/Sidebar'
import Footer from './layout/Footer/Footer'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedUser: null,
      showAlert: false,
      alertText: '',
      orderNumber: 0,
      categoryList: undefined
    }
    this.authService = new AuthService()
    this.orderNumber = new OrdersService()
    this.categoryService = new CategoryService()
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

  updateCurrentUser = () => {
    this.authService
      .updateUser()
      .then(response => {
        this.setState({ loggedUser: response.data })
      })
      .catch(() => this.setState({ loggedUser: undefined }))
  }

  componentDidMount() {
    this.fetchUser()
    this.updateCurrentUser()
    this.loadCategories()
  }

  updateCartNumber() {
    this.orderNumber
      .getUserOrder()
      .then(response => response.data && this.setState({ orderNumber: response.data[0].products.length }))
      .catch(err => console.log(err))
  }

  loadCategories() {
    this.categoryService
      .getAllCategories()
      .then(response => this.setState({ categoryList: response.data }))
      .catch(err => console.log('Error', err))
  }

  render() {
    return (
      (
        <>
          <Navigation handleAlert={alertText => this.handleAlert(alertText)}
            storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} orderNumber={this.state.orderNumber} categoryList={this.state.categoryList} history={this.props.history} />

          <div style={this.state.loggedUser && this.state.loggedUser.role === 'ADMIN' ? { display: 'flex', width: "100%" } : null}>

            {(this.state.loggedUser && this.state.loggedUser.role === 'ADMIN') ? <Sidebar storeUser={user => this.storeUser(user)} /> : null}

            <main style={{ flex: '1', marginTop: "10px" }}>

              <Routes storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} handleAlert={alertText => this.handleAlert(alertText)} updateCartNumber={() => this.updateCartNumber()} updateCurrentUser={() => this.updateCurrentUser()} />

              <Alert handleAlert={(alertText, showAlert) => this.handleAlert(alertText, showAlert)} show={this.state.showAlert} text={this.state.alertText} />

            </main>
          </div>
          <Footer />
        </>
      )
    )
  }
}

export default App
