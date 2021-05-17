import './CustomerOrderCard.css'
import { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import CustomerOrderRow from './CustomerOrderRow'

class CustomerOrderCard extends Component {

    constructor() {
        super()
        this.state = {
            products: undefined
        }
    }

    componentDidMount() {
        this.updateProducts()
    }

    updateProducts() {
        this.setState({products: this.props.products})
    }

    render() {

        const date = this.props.updatedAt.replace(/T.*/,'').split('-').reverse().join('-')
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        const total = this.props.products.map(elm => elm.option.price*elm.quantity).reduce(reducer)

        return(
        <section>
            <div className="order-header">
            <Row>
                <Col md={3}>
                    <span>ORDER DATE:<br></br> {date}</span>
                </Col>
                <Col md={3}>
                    <span>TOTAL:<br></br> ${total}</span>
                </Col>
                <Col md={6}>
                    <span>ORDER N.º {this.props._id}</span>  
                </Col>
            </Row>
            </div>
            {!this.state.products? <h1>Loading...</h1> : 
            this.state.products.map(elm => <CustomerOrderRow key={elm._id} {...elm}/>)}
        </section>
    )
    }
}

export default CustomerOrderCard