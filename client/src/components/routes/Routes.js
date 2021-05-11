import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/Products/ProductDetails'
import ProductList from '../pages/Products/ProductList'
import SupplierPage from '../pages/Products/SupplierPage'
import Dashboard from '../pages/admin/Dashboard'
import ClientList from '../pages/admin/ClientList'
import SupplierProfile from '../pages/SupplierArea/SupplierProfile'
import NewOption from '../pages/NewProduct/NewOption'
import MyProductCard from '../pages/SupplierArea/MyProductsCard'

const Routes = ({loggedUser}) => {
    return (
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/product" render={() => <ProductList />} />
            <Route path="/product/:id" render={props => <ProductDetails {...props} />} />
            <Route path="/product/:supplier_id" render={props => <SupplierPage {...props} />} />
            <Route path="/admin" render={props => <ClientList />} />
            <Route path="/supplier" exact render={()=> <SupplierProfile loggedUser={loggedUser} />} />
            <Route path="/supplier/productdetails" render={() => <MyProductCard/>} />
            <Route path="/supplier/options" render={() => <NewOption/>} />
        </Switch>
    )
}

export default Routes