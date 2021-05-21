import { Button } from 'react-bootstrap'
import AuthService from '../../../service/auth.service'
import ClientService from '../../../service/client.service'
import OptionService from '../../../service/option.service'
import ProductsService from '../../../service/products.service'

const DeleteUser = ({ ...props }) => {

    const clientService = new ClientService()
    const productService = new ProductsService()
    const optionService = new OptionService()
    const authService = new AuthService()

    function eliminateAccount(e) {

        e.preventDefault()

        if (props.currentUser.client?.products.options?.length) {
            props.currentUser.client.products.options.forEach(option => {
                optionService
                    .deleteOption(option)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(err => console.log(err))
            })
        }

        if (props.currentUser.client?.products?.length) {
            props.currentUser.client.products.forEach(product => {
                productService
                    .deleteProduct(product)
                    .then(response => this.props.fetchProducts())
                    .catch(err => console.log(err))
            })
        }

        if (props.currentUser.client) {
            clientService
                .deleteClient(props.currentUser.client._id)
                .then(response => console.log('client', response))
                .catch(err => console.log('Error deleting client', err))
        }

        authService
            .deleteUser(props.currentUser._id)
            .then(response => props.loggedUser.role === 'ADMIN' ? props.loadClients() : logOut())
            .catch(err => console.log('Error deleting user', err))

    }


    function logOut() {
        authService
            .logout()
            .then(res => props.storeUser(undefined))
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