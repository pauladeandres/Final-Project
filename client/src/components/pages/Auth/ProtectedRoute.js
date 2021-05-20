import SpinnerRoll from './../../shared/Spinner/SpinnnerRoll'
import { Redirect } from 'react-router-dom'

const ProtectedRoute = ({ loggedUser, condition, component: Component, ...props }) => {

    return loggedUser === null ? <SpinnerRoll/> : loggedUser && condition ? <Component loggedUser={loggedUser} {...props} />
        :
        <Redirect to={'/login'} />
}

export default ProtectedRoute