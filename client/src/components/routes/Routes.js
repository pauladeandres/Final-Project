import { Switch, Route } from 'react-router-dom'
import ProductDetails from '../pages/Products/ProductDetails'
import Dashboard from '../pages/admin/Dashboard'
import ClientList from '../pages/admin/ClientList'

const Routes = () => {
    return (
        <Switch>
            <Route path="/product/:id" render={props => <ProductDetails {...props} />} />
            <Route path="/admin" render={props => <ClientList />} />
            <Route path="/suppliers" render={props => <ProductDetails {...props} />} />
        </Switch>
    )
}

export default Routes