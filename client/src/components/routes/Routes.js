import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/Products/ProductDetails'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import ProductList from '../pages/Products/ProductList'
import SupplierPage from '../pages/Products/SupplierPage'
import Dashboard from '../pages/Admin/Dashboard'
import ClientList from '../pages/Admin/ClientList'
import SupplierList from '../pages/Admin/SupplierList'
import Login from '../pages/Login/Login'
import SignupForm from '../pages/Auth/SignupForm'
import InitialSignup from '../pages/Auth/InitialSignup'
import SupplierProfile from '../pages/ClientArea/SupplierProfile'
import NewOption from '../pages/NewProduct/NewOption'
import MyProductCard from '../pages/ClientArea/MyProductsCard'
import MyProductDetails from '../pages/ClientArea/MyProductDetails'
import ProtectedRoute from '../pages/Auth/ProtectedRoute'
import CustomerArea from '../pages/ClientArea/CustomerArea'
import { isAccepted } from '../../utils/index'

const Routes = ({ storeUser, loggedUser, history, handleAlert, updateCartNumber, updateCurrentUser }) => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/signup" exact render={props => <InitialSignup history={props.history} handleAlert={handleAlert} />} />
            <Route path="/login" exact render={props => <Login storeUser={storeUser} history={props.history} updateCartNumber={updateCartNumber} handleAlert={handleAlert} />} />

            <Route path="/product" exact render={() => <ProductList />} />
            <Route path="/product/:id" render={props => <ProductDetails {...props} storeUser={storeUser} history={props.history} loggedUser={loggedUser} updateCartNumber={updateCartNumber} handleAlert={handleAlert} />} />
            <Route path="/product/brand/:supplier_id" render={props => <SupplierPage {...props} />} />

            <Route path="/admin" exact render={() => <ProtectedRoute condition={isAccepted(['ADMIN'], loggedUser)} loggedUser={loggedUser} component={Dashboard} />} />
            <Route path="/admin/clients" render={() => <ProtectedRoute condition={isAccepted(['ADMIN'], loggedUser)} loggedUser={loggedUser} component={ClientList} />} />
            <Route path="/admin/suppliers" render={() => <ProtectedRoute condition={isAccepted(['ADMIN'], loggedUser)} loggedUser={loggedUser} component={SupplierList} />} />

            <Route path="/supplier/myarea/:id" exact render={props => <SupplierProfile storeUser={storeUser} loggedUser={loggedUser} handleAlert={handleAlert} history={props.history} {...props} />} />
            <Route path="/supplier/myarea/myproductdetails/:id" render={props => <MyProductDetails storeUser={storeUser} loggedUser={loggedUser} {...props} />} />
            <Route path="/supplier/signup" render={props => <SignupForm updateCurrentUser={updateCurrentUser} history={props.history} loggedUser={loggedUser} handleAlert={handleAlert} />} />
            <Route path="/supplier/productdetails" render={() => <MyProductCard />} />
            <Route path="/supplier/options" render={() => <NewOption />} />

            <Route path="/cart" render={() => <Cart updateCartNumber={updateCartNumber} handleAlert={handleAlert} />} />
            <Route path="/checkout" render={props => <Checkout history={props.history} updateCurrentUser={updateCurrentUser} loggedUser={loggedUser} handleAlert={handleAlert} />} />
            <Route page="/customer-area" render={props => <CustomerArea loggedUser={loggedUser} handleAlert={handleAlert} history={props.history} />} />
        </Switch>
    )
}

export default Routes