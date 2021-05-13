import { Component } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutRow = (product) => {

    console.log(product.product.name)

          return (
              <row>
                <h5>{product.product.name}</h5>
                <p>Color: {product.option.color}</p>
                <p>Unit price: <b>${product.option.price}</b></p>
              </row>
              

          )
      
}

export default CheckoutRow