import { Button } from 'react-bootstrap'
import AuthService from 'service/auth.service'
import ClientService from '../../../service/client.service'

const DeleteUser = ({ currentUser, props, storeUser, loggedUser, loadClients }) => {

    const clientService = new ClientService()
    const authService = new AuthService()

    function eliminateAccount(e) {

        e.preventDefault()
        
        clientService
            .deleteClient(currentUser.client._id)
            .then(response => console.log(response))
            .catch(err => console.log('Error deleting client', err))

        authService
            .deleteUser(currentUser._id)
            .then(response => {
                if(loggedUser.role !== 'ADMIN'){
                    props.history.push('/')
                }
                props.handleAlert(`Account deleted correctly`)
                console.log(props)
            })
            .catch(err => console.log('Error deleting user', err))

      (loggedUser.role !== 'ADMIN'
        ?
        logOut()
        :
        loadClients)
    }

    function logOut () {
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