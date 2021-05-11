import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/Products/ProductDetails'
import ProductList from '../pages/Products/ProductList'
import SupplierPage from '../pages/Products/SupplierPage'
import Dashboard from '../pages/admin/Dashboard'
import ClientList from '../pages/admin/ClientList'
import SupplierList from '../pages/admin/SupplierList'
import Login from '../pages/Login/Login'
import SignupForm from '../pages/auth/SignupForm'
import InitialSignup from '../pages/auth/InitialSignup'

const Routes = ({ storeUser, loggedUser }) => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/signup" exact render={props => <InitialSignup history={props.history} />} />
            <Route path="/login" exact render={props => <Login storeUser={storeUser} history={props.history} />} />

            <Route path="/product" render={() => <ProductList />} />
            <Route path="/product/:id" render={props => <ProductDetails {...props} />} />
            <Route path="/product/:supplier_id" render={props => <SupplierPage {...props} />} />

            <Route path="/admin" exact render={props => <SupplierList />} />
            <Route path="/admin/clients" render={() => <ClientList />} />
            <Route path="/admin/suppliers" render={() => <SupplierList />} />

            <Route path="/suppliers" exact render={props => <ProductDetails {...props} />} />
            <Route path="/suppliers/signup" render={props => <SignupForm history={props.history} />} />
        </Switch>
    )
}

export default Routes