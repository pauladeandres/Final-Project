import { Component } from "react"
import { Container, Row } from "react-bootstrap"
import AdminServices from '../../../service/admin.service'
import ClientCard from "./ClientCard"


class SupplierList extends Component {
    constructor() {
        super()
        this.state = {
            suppliers: undefined
        }
        this.adminService = new AdminServices()
    }

    componentDidMount() {
        this.loadClients()
    }

    loadClients() {
        this.adminService
            .getAllSuppliers()
            .then(response => this.setState({ suppliers: response.data }))
            .catch(err => console.log(err))
    }

    render() {
        const { suppliers } = this.state
        console.log(suppliers)
        return (
            <Container>
                <Row>
                    {suppliers
                        ?
                        suppliers.map(elm => <ClientCard key={elm._id} {...elm} />)
                        :
                        <h1>Cargando...</h1>
                    }
                </Row>
            </Container>)
    }
}

export default SupplierList