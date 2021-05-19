
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteUser from './../ClientArea/DeleteUser'

const ClientCard = ({ number, edit, editRole, ...props }) => {
    console.log('card props', props)
    return (
        // <Col md={3}>
        <>
            <tr>
                <th scope="row">{number}</th>
                <td><Link to={`/supplier/myarea/${props._id}`}> {props.email}</Link></td>
                <td>test</td>
                <td>{props.favoriteProducts.length}</td>
                {props.client ? <td onClick={(e) => edit(e, props.client)}>Edit</td> : <td></td>}
                <td> <DeleteUser currentUser={props} props storeUser/></td>
                <DropdownButton id="dropdown-basic-button" title="Change role" onSelect={(e, eventKey) => editRole(e)} >
                    <Dropdown.Item eventKey={'SUPPLIER'}>SUPPLIER</Dropdown.Item>
                    <Dropdown.Item eventKey={'CUSTOMER'}>CUSTOMER</Dropdown.Item>
                </DropdownButton>
            </tr>
        </>
        // </Col >
    )
}

export default ClientCard