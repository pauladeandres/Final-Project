
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const ClientCard = ({ number, edit, ...props }) => {
    // console.log('card props', props)
    return (
        // <Col md={3}>
        <tr>
            <th scope="row">{number}</th>
            <td><Link to={`/supplier/myarea/${props._id}`}> {props.email}</Link></td>
            <td>test</td>
            <td>{props.favoriteProducts.length}</td>
            {props.client ? <td onClick={(e) => edit(e, props.client)}>Edit</td> : <td></td>}
            {<td onClick={(e) => edit(e, props.client)}>DELETE</td>}
        </tr>
        // </Col >
    )
}

export default ClientCard