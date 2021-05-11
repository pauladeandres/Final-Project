import { Component } from "react"
import { Container, Row } from "react-bootstrap"
import AdminServices from '../../../service/admin.service'
import ClientCard from "./ClientCard"


class ClientList extends Component {
    constructor() {
        super()
        this.state = {
            clients: undefined
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

    render() {
        const { clients } = this.state
        console.log(clients)
        return (
            <Container>
                <Row>
                    {!clients
                        ?
                        { clients.map(elm => <ClientCard key={elm.id} {...elm} />) }
                        :
                        <h1>Cargando...</h1>
                    }
                </Row>
            </Container>)
    }
}

export default ClientList