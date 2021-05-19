
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteUser from './../ClientArea/DeleteUser'

const ClientCard = ({ number, edit, editRole, loadClients, loggedUser, ...props  }) => {
    console.log('card props', props)
    const userId = props._id
    return (
        <>
            <tr>
                <th scope="row">{number}</th>
                <td> {(props.role === 'SUPPLIER' && props.client) ? <Link to={`/supplier/myarea/${userId}`}> {props.email}</Link> : props.email} </td>
                <td>test</td>
                <td>{props.favoriteProducts.length}</td>
                {props.client ? <td onClick={(e) => edit(e, props.client)}>Edit</td> : <td></td>}
                <td> <DeleteUser currentUser={props} /></td>
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