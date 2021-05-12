import { Component } from "react"
import { Container } from "react-bootstrap"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import LineChart from "./LineChart"
import testData from './data'
import AdminService from "../../../service/admin.service"

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            data: undefined
        }
        this.adminService = new AdminService()
    }

    componentDidMount() {
        this.adminService
            .getOrdersData()
            .then(response => {
                console.log("the response from server:", response.data)
                this.setState({ data: response.data })
            })
            .catch(err => console.log(err))
    }

    getData(data) {
        console.log(data)
    }

    getDataClients() {

    }


    render() {
        //console.log(this.state.data)
        //console.log(testData)
        return (!this.props.loggedUser || this.props.loggedUser.role !== 'ADMIN') ? <Redirect to="/" /> :
            (
                <Container style={{ height: "300px" }}>
                    <h1>Dashboard</h1>
                    <LineChart data={this.state.data ? this.state.data : testData} />
                </Container >)
    }
}

export default Dashboard