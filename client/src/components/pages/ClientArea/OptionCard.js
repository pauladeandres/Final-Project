import OptionService from '../../../service/option.service'
import trash from './trash.jpg'
import { Button } from 'react-bootstrap'

const OptionCard = ({_id, image, price, stock, color, fetchProduct, handleAlert}) => {
    function deleteProductOption(e) {
        const optionService = new OptionService()
        e.preventDefault()
        optionService
            .deleteOption(_id)
            .then(() => {
                fetchProduct()
                handleAlert(`This option has been removed`)
            })
            .catch(err => console.log(err))
    }

        return (   
                <>
                <tr >
                    <td className="image-container" >
                        <img style={{width: '200px'}} src={image} alt={color}/>
                    </td>
                    <td>{_id}</td>
                    <td>{price}</td>
                    <td>{color}</td>
                    <td>{stock}</td>
                    <td><Button onClick={(e) => deleteProductOption(e)} variant="outline-dark" ><img style={{ width: '30px' }} src={trash} alt="delete button"/></Button></td>
                    </tr>
                </>
        )
    }

export default OptionCard