import { Card, Col } from 'react-bootstrap'

const ClientCard = ({ number, edit, ...props }) => {
    console.log(props)
    return (
        // <Col md={3}>
        <tr>
            <th scope="row">{number}</th>
            <td>{props.email}</td>
            <td>test</td>
            <td>{props.favoriteProducts.length}</td>
            <td onClick={(e) => edit(e)}>Edit</td>
        </tr>
        // </Col >
    )
}

export default ClientCard