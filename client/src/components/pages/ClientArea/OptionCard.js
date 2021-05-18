import { Component } from 'react'

import OptionService from '../../../service/option.service'

import trash from './trash.jpg'

import { Button } from 'react-bootstrap'

const OptionCard = ({_id, image, price, stock, color, fetchProduct}) => {

    function deleteProductOption(e) {

        const optionService = new OptionService()

        e.preventDefault()
        console.log(_id)

        optionService
            .deleteOption(_id)
            .then(response => {
                console.log(response)
                fetchProduct()
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