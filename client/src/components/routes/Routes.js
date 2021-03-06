import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/Products/ProductDetails'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import Products from '../pages/Products/Products'
import ProductPerCategory from '../pages/Products/ProductperCategory'
import ProductPerSupplier from '../pages/Products/ProductperSupplier'
import Dashboard from '../pages/Admin/Dashboard'
import ClientList from '../pages/Admin/ClientList'
import SupplierList from '../pages/Admin/SupplierList'
import Login from '../pages/Login/Login'
import SignupForm from '../pages/Auth/SignupForm'
import InitialSignup from '../pages/Auth/InitialSignup'
import SupplierProfile from '../pages/ClientArea/SupplierProfile'
import MyProductDetails from '../pages/ClientArea/MyProductDetails'
import ProtectedRoute from '../pages/Auth/ProtectedRoute'
import CustomerArea from '../pages/ClientArea/CustomerArea'
import PaymentConfirmation from '../pages/Payment/PaymentConfirmation'
import { isAccepted } from '../../utils/index'
import Contact from 'components/pages/Contact/Contact'

const Routes = ({ storeUser, loggedUser, handleAlert, updateCartNumber, updateCurrentUser, categoryList }) => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home updateCartNumber={updateCartNumber} />} />
            <Route path="/signup" exact render={props => <InitialSignup history={props.history} handleAlert={handleAlert} />} />
            <Route path="/login" exact render={props => <Login storeUser={storeUser} history={props.history} updateCartNumber={updateCartNumber} handleAlert={handleAlert} />} />
            <Route path="/contact" exact render={props => <Contact handleAlert={handleAlert} history={props.history} />} />

            <Route path="/product" exact render={() => <Products />} />
            <Route path="/product/:id" render={props => <ProductDetails {...props} storeUser={storeUser} history={props.history} loggedUser={loggedUser} updateCartNumber={updateCartNumber} handleAlert={handleAlert} />} />
            <Route path="/category/:id" render={props => <ProductPerCategory {...props} />} />
            <Route path="/brand/:supplier_id" render={props => <ProductPerSupplier {...props} />} />

            <Route path="/admin" exact render={() => <ProtectedRoute condition={isAccepted(['ADMIN'], loggedUser)} loggedUser={loggedUser} component={Dashboard} />} />
            <Route path="/admin/clients" render={() => <ProtectedRoute condition={isAccepted(['ADMIN'], loggedUser)} loggedUser={loggedUser} component={ClientList} />} />
            <Route path="/admin/suppliers" render={() => <ProtectedRoute condition={isAccepted(['ADMIN'], loggedUser)} loggedUser={loggedUser} component={SupplierList} />} />

            <Route path="/supplier/myarea/:id" exact render={props => <ProtectedRoute condition={isAccepted(['SUPPLIER', 'ADMIN'], loggedUser)} storeUser={storeUser} loggedUser={loggedUser} handleAlert={handleAlert} history={props.history} {...props} component={SupplierProfile} />} />
            <Route path="/supplier/myarea/myproductdetails/:id" render={props => <ProtectedRoute condition={isAccepted(['SUPPLIER', 'ADMIN'], loggedUser)} handleAlert={handleAlert} storeUser={storeUser} loggedUser={loggedUser} {...props} component={MyProductDetails} />} />
            <Route path="/supplier/signup" render={props => <SignupForm updateCurrentUser={updateCurrentUser} history={props.history} loggedUser={loggedUser} handleAlert={handleAlert} />} />

            <Route path="/cart" render={() => <ProtectedRoute condition={isAccepted(['SUPPLIER', 'ADMIN', 'CUSTOMER'], loggedUser)} loggedUser={loggedUser} updateCartNumber={updateCartNumber} handleAlert={handleAlert} component={Cart} />} />
            <Route path="/checkout" render={props => <ProtectedRoute condition={isAccepted(['SUPPLIER', 'ADMIN', 'CUSTOMER'], loggedUser)} history={props.history} updateCurrentUser={updateCurrentUser} loggedUser={loggedUser} handleAlert={handleAlert} component={Checkout} />} />
            <Route path="/confirm" render={() => <ProtectedRoute condition={isAccepted(['SUPPLIER', 'ADMIN', 'CUSTOMER'], loggedUser)} loggedUser={loggedUser} updateCartNumber={updateCartNumber} component={PaymentConfirmation} />} />
            <Route page="/customer-area" render={props => <ProtectedRoute condition={isAccepted(['SUPPLIER', 'ADMIN', 'CUSTOMER'], loggedUser)} storeUser={storeUser} updateCurrentUser={updateCurrentUser} loggedUser={loggedUser} handleAlert={handleAlert} history={props.history} updateCartNumber={updateCartNumber} component={CustomerArea} />} />
        </Switch>
    )
}

export default Routes