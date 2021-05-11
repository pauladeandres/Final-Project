import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/Products/ProductDetails'
import Cart from '../pages/Cart/Cart'
import ProductList from '../pages/Products/ProductList'
import SupplierPage from '../pages/Products/SupplierPage'
import Dashboard from '../pages/admin/Dashboard'
import ClientList from '../pages/admin/ClientList'

const Routes = (handleAlert) => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/product" exact render={() => <ProductList />} />
            <Route path="/product/:id" render={props => <ProductDetails handleAlert={handleAlert} {...props}/>} />
            <Route path="/cart" exact render={() => <Cart />} />
            <Route path="/product/:supplier_id" render={props => <SupplierPage {...props} />} />
            <Route path="/admin" render={props => <ClientList />} />
            <Route path="/suppliers" render={props => <ProductDetails {...props} />} />
        </Switch>
    )
}

export default Routes