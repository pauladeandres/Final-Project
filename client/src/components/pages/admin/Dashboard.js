import { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import LineChart from "./LineChart"
import BarChart from './BarChart'
import testData from './data'
import AdminService from "../../../service/admin.service"
import TreeChart from "./TreeChart"
import TreeData from './TreeData'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            orders: undefined,
            products: undefined,
            categories: undefined,
            clients: {
                customers: undefined,
                suppliers: undefined
            }
        }
        this.adminService = new AdminService()
    }

    componentDidMount() {
        this.getData()
        this.getDataClients()
    }

    getData() {
        this.adminService
            .getData()
            .then(response => {
                console.log("the response from server:", response)
                const { orders, products, categories } = response.data
                console.log('orders:', orders, 'categories', categories)
                this.setState({ orders, products, categories })
            })
            .catch(err => console.log(err))
    }

    getDataClients() {
        this.getCustomers()
        this.getSuppliers()
    }

    getCustomers() {
        this.adminService
            .getAllClients()
            .then(response => {
                this.setState({ clients: { ...this.state.clients, customers: response.data } })
            })
            .catch(err => console.log(err))
    }

    getSuppliers() {
        this.adminService
            .getAllSuppliers()
            .then(response => {
                this.setState({ clients: { ...this.state.clients, suppliers: response.data } })
            })
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state.clients)
        return !this.state.orders ? <h1>Fetching data...</h1> :
            (
                <Container >
                    <h1>Dashboard</h1>
                    <Row>
                        <Col md={3}>
                            <h2>Products: {this.state.products.length}</h2>
                        </Col>
                        <Col md={3}>
                            <h2>Clients: {this.state.clients.customers ? this.state.clients.customers.length : <h2>...</h2>}</h2>
                        </Col>
                        <Col md={3}>
                            <h2>Suppliers: {this.state.clients.customers ? this.state.clients.suppliers.length : <h2>...</h2>}</h2>
                        </Col>
                        <Col md={3}>
                            <h2>Orders: {this.state.orders.length}</h2>
                        </Col>

                    </Row>
                    <Row style={{ height: "300px" }}>
                        <Col md={8}></Col>
                        {!this.state.products ? <h2>Loading charts...</h2> : <BarChart data={this.state.products} />}
                        <Col md={8}></Col>
                    </Row>
                    <Row style={{ height: "300px" }}>
                        <Col md={8}></Col>
                        {!this.state.orders ? <h2>Loading charts...</h2> : <LineChart data={this.state.orders} />}
                        <Col md={8}></Col>
                    </Row>
                    <Row style={{ height: "300px" }}>
                        <Col md={8}></Col>
                        {!this.state.categories ? <h2>Loading charts...</h2> : <TreeChart data={this.state.categories} />}
                        <Col md={8}></Col>
                    </Row>
                </Container >
            )
    }
}

export default Dashboard