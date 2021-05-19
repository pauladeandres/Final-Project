
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteUser from './../ClientArea/DeleteUser'

const ClientCard = ({ number, edit, editRole, ...props }) => {
    console.log('card props', props)
    const userId = props._id
    return (
        <>
            <tr>
                <th scope="row">{number}</th>
                <td><Link to={`/supplier/myarea/${userId}`}> {props.email}</Link></td>
                <td>test</td>
                <td>{props.favoriteProducts.length}</td>
                {props.client ? <td onClick={(e) => edit(e, props.client)}>Edit</td> : <td></td>}
                {<td onClick={(e) => edit(e, props.client)}>DELETE</td>}
                <td> <DeleteUser currentUser={props} props storeUser /></td>
                <DropdownButton id="dropdown-basic-button" title="Change role" onSelect={(e) => editRole(e, userId)} >
                    <Dropdown.Item eventKey={'SUPPLIER'}>SUPPLIER</Dropdown.Item>
                    <Dropdown.Item eventKey={'CUSTOMER'}>CUSTOMER</Dropdown.Item>
                </DropdownButton>
            </tr>
        </>
        // </Col >
    )
}

export default ClientCard