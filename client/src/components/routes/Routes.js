import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/Products/ProductDetails'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import ProductList from '../pages/Products/ProductList'
import SupplierPage from '../pages/Products/SupplierPage'
import Dashboard from '../pages/admin/Dashboard'
import ClientList from '../pages/admin/ClientList'
import SupplierList from '../pages/admin/SupplierList'
import Login from '../pages/Login/Login'
import SignupForm from '../pages/auth/SignupForm'
import InitialSignup from '../pages/auth/InitialSignup'
import SupplierProfile from '../pages/SupplierArea/SupplierProfile'
import NewOption from '../pages/NewProduct/NewOption'
import MyProductCard from '../pages/SupplierArea/MyProductsCard'
import MyProductDetails from '../pages/SupplierArea/MyProductDetails'

const Routes = ({ storeUser, loggedUser, history, handleAlert, updateCartNumber }) => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/signup" exact render={props => <InitialSignup history={props.history} />} />
            <Route path="/login" exact render={props => <Login storeUser={storeUser} history={props.history} updateCartNumber={updateCartNumber}/>} />

            <Route path="/product" exact render={() => <ProductList />} />
            <Route path="/product/:id" render={props => <ProductDetails {...props} storeUser={storeUser} history={props.history} loggedUser={loggedUser} updateCartNumber={updateCartNumber}/>} />
            <Route path="/product/brand/:supplier_id" render={props => <SupplierPage {...props} />} />

            <Route path="/admin" exact render={() => <Dashboard loggedUser={loggedUser} />} />
            <Route path="/admin/clients" render={() => <ClientList loggedUser={loggedUser} />} />
            <Route path="/admin/suppliers" render={() => <SupplierList loggedUser={loggedUser} />} />

            <Route path="/supplier/myarea/:id" exact render={props => <SupplierProfile storeUser={storeUser}  loggedUser={loggedUser} {...props}/> } />
            <Route path="/supplier/myarea/myproductdetails/:id" render={props => <MyProductDetails storeUser={storeUser} loggedUser={loggedUser} {...props} />} />
            <Route path="/supplier/signup" render={props => <SignupForm history={props.history} />} />
            <Route path="/supplier/productdetails" render={() => <MyProductCard />} />
            <Route path="/supplier/options" render={() => <NewOption />} />

            <Route path="/cart" render={() => <Cart updateCartNumber={updateCartNumber}/>} />
            <Route path="/checkout" render={() => <Checkout />} />
        </Switch>
    )
}

export default Routes