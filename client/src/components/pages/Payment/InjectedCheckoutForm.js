import {ElementsConsumer} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

const InjectedCheckoutForm = () => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <CheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
)

export default InjectedCheckoutForm