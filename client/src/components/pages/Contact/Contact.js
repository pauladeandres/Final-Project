import ContactForm from "./ContactForm";

const { InputGroup, FormControl, Form } = require("react-bootstrap");

const Contact = (props) => {

    return (
        <ContactForm {...props} ></ContactForm>

    )


}


export default Contact