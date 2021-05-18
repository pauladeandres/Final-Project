import SpinnerRoll from "components/shared/Spinner/SpinnnerRoll"
import { Component } from "react"
import { Container, Modal, Row } from "react-bootstrap"
import AdminServices from '../../../service/admin.service'
import ClientCard from "./ClientCard"


class ClientList extends Component {
    constructor() {
        super()
        this.state = {
            clients: undefined,
            showModal: false
        }
        this.adminService = new AdminServices()
    }

    componentDidMount() {
        this.loadClients()
    }

    loadClients() {
        this.adminService
            .getAllClients()
            .then(response => this.setState({ clients: response.data }))
            .catch(err => console.log('error no lo coge'))
    }

    onClickEdit(e) {
        console.log('click')
        this.setState({ showModal: true })
    }

    render() {
        console.log(this.props.loggedUser)
        const { clients } = this.state
        console.log(clients)
        return (
            <Container>
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header> <Modal.Title>Edit user</Modal.Title> </Modal.Header>
                    <Modal.Body> Hola que hase</Modal.Body>
                </Modal>
                <Row>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Test</th>
                                <th scope="col"># Favorites</th>
                                <th scope="col">Edit user</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients
                                ?
                                clients.map((elm, index) => <ClientCard key={elm.id} number={index} edit={(e) => this.onClickEdit(e)}{...elm} />)
                                :
                                <SpinnerRoll />
                            }

                        </tbody>
                    </table>
                </Row>
            </Container>
        )
    }
}

export default ClientList