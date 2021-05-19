import { Button } from 'react-bootstrap'
import AuthService from '../../../service/auth.service'
import ClientService from '../../../service/client.service'

const DeleteUser = ({ currentUser }) => {

    const clientService = new ClientService()

    const authService = new AuthService()
 
    function eliminateAccount(e) {
        console.log(currentUser)
        e.preventDefault()

        if(currentUser.client){
        clientService
            .deleteClient(currentUser.client)
            .then(response => console.log('client',response))
            .catch(err => console.log('Error deleting client', err))
        }

        authService
            .deleteUser(currentUser._id)
            .then(response => {
                console.log('user',response)
                })
            .catch(err => console.log('Error deleting user', err))
        
    }

    function logOut () {
        authService
            .logout()
            .then(res => console.log(res))
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