
import { Redirect } from 'react-router-dom'

const ProtectedRoute = ({ loggedUser, condition, component: Component, ...props }) => {

    return loggedUser && condition ? <Component loggedUser={loggedUser} {...props} />
        :
        <Redirect to={'/login'} />
}

export default ProtectedRoute