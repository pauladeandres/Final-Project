import { Button } from 'react-bootstrap'
import AuthService from 'service/auth.service'
import ClientService from '../../../service/client.service'

const DeleteUser = ({ currentUser, props, storeUser }) => {

    const clientService = new ClientService()
    const authService = new AuthService()

    function eliminateAccount(e) {

        e.preventDefault()
        console.log(currentUser)

        clientService
            .deleteClient(currentUser.client._id)
            .then(response => console.log(response))
            .catch(err => console.log('Error deleting client', err))

        authService
            .deleteUser(currentUser._id)
            .then(response => {
                props.history.push('/')
                props.handleAlert(`Account deleted correctly`)
                console.log(props)
            })
            .catch(err => console.log('Error deleting user', err))
        
        authService
            .logout()
            .then(() => storeUser(undefined))
            .catch(err => console.log(err))
    }

    return (

        <>
            <Button onClick={(e) => eliminateAccount(e)} variant="outline-danger" style={{ width: '100%' }}>
                Delete Account
            </Button>
        </>

    )
}

export default DeleteUser