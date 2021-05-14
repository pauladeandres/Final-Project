import { Component } from 'react'

import ProductsService from '../../../service/products.service'

import trash from './trash.jpg'

import { Button } from 'react-bootstrap'

const OptionCard = ({_id, image, price, stock, color, fetchProducts}) => {

    function deleteProductOption(e) {
        const productService = new ProductsService()
        e.preventDefault()

        productService
            .deleteOption(_id)
            .then(response => {
                this.props.fetchProduct()
            })
            .catch(err => console.log(err))
    }

        return (
              
                <>
                <tr >
                    <td className="image-container" >
                        <img style={{width: '200px'}} src={image} />
                    </td>
                    <td>{_id}</td>
                    <td>{price}</td>
                    <td>{color}</td>
                    <td>{stock}</td>
                    <td><Button onClick={(e) => deleteProductOption(e)} variant="outline-dark" ><img style={{ width: '30px' }} src={trash} /></Button></td>
                    </tr>
                </>

        )
    }

export default OptionCard