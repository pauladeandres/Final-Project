import { Switch, Route } from 'react-router-dom'
import ProductDetails from '../pages/Products/ProductDetails'

const Routes = () => {
    return (
        <Switch>
            <Route path="/product/:id" render={props => <ProductDetails {...props} />} />
        </Switch>
    )
}

export default Routes