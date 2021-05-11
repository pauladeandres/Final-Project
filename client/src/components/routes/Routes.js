import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/Products/ProductDetails'
import ProductList from '../pages/Products/ProductList'
import SupplierPage from '../pages/Products/SupplierPage'

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/product" render={() => <ProductList />} />
            <Route path="/product/:id" render={props => <ProductDetails {...props} />} />
            <Route path="/product/:supplier_id" render={props => <SupplierPage {...props} />} />
        </Switch>
    )
}

export default Routes