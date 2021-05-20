import './Payment.css'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './PaymentForm'

const stripePromise = loadStripe('pk_test_51Is8adJE4qSE89JMvcORBlSdU36pr3in0HPADEthZQqgtlzOdesvZ38ZuJPOcGhXlzJkIRp2px3zyKcKF5EdaYYP00lhOozlNu');


export default function Payment({history, total, orderId}) {
    
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm history={history} total={total} orderId={orderId}/>
      </Elements> 
    </div>
  );
}
