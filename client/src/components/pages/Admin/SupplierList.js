import SpinnerRoll from "components/shared/Spinner/SpinnnerRoll"
import { Component } from "react"
import { Container, Row } from "react-bootstrap"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
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
        console.log(this.props.loggedUser)
        return (!this.props.loggedUser || this.props.loggedUser.role !== 'ADMIN') ? <Redirect to="/" /> :
            (
                <Container>
                    <Row>
                        < table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Test</th>
                                    <th scope="col"># Favorites</th>
                                    <th scope="col">Edit user</th>
                                    <th scope="col">Delete user</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers
                                    ?
                                    suppliers.map((elm, index) => <ClientCard key={elm._id} {...elm} number={index} loadClients={()=>this.loadClients()} loggedUser={this.props.loggedUser}/>)
                                    :
                                    <SpinnerRoll />
                                }
                            </tbody>
                        </table>

                    </Row>
                </Container >)
    }
}

export default SupplierList