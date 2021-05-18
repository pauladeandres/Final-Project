import './CustomerOrderCard.css'
import { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import CustomerOrderRow from './CustomerOrderRow'
import SpinnerRoll from '../../shared/Spinner/SpinnnerRoll'

class CustomerOrderCard extends Component {

    constructor() {
        super()
        this.state = {
            products: undefined,
            total: 0
        }
    }

    componentDidMount() {
        this.updateProducts()
        this.updateTotal()
    }

    updateProducts() {
        this.setState({ products: this.props.products })
    }

    updateTotal() {
        this.props.coupon ?
            this.setState({ total: this.props.products.map(elm => elm.option.price * elm.quantity).reduce((accumulator, currentValue) => accumulator + currentValue) - this.props.coupon.value })
            : this.setState({ total: this.props.products.map(elm => elm.option.price * elm.quantity).reduce((accumulator, currentValue) => accumulator + currentValue) })
    }

    render() {

        const date = this.props.updatedAt.replace(/T.*/, '').split('-').reverse().join('-')

        return (
            <section>
                <div className="order-header">
                    <Row>
                        <Col md={3}>
                            <span>ORDER DATE:<br></br> {date}</span>
                        </Col>
                        <Col md={3}>
                            <span>TOTAL:<br></br> ${this.state.total}</span>
                        </Col>
                        <Col md={6}>
                            <span>ORDER N.º {this.props._id}</span>
                        </Col>
                    </Row>
                </div>
                {!this.state.products ? <SpinnerRoll /> :
                    this.state.products.map(elm => <CustomerOrderRow key={elm._id} {...elm} />)}
            </section>
        )
    }
}

export default CustomerOrderCard