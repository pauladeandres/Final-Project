import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import StripeService from '../../../service/stripe.service'
import OrderService from '../../../service/order.service'

import './PaymentForm.css'
const stripeService = new StripeService()
const orderService = new OrderService()

const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

export default function CheckoutForm({history, total, orderId}) {
  
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  
  useEffect(() => {
    stripeService
      .createPayment(total, orderId)
      .then(response => setClientSecret(response.data.clientSecret))
      .catch(err => console.log(err))
  }, );

  const updatePayment = () => {

    orderService
      .makeAsPaid()
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      updatePayment() 
      history.push('/confirm')
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        className="btn btn-dark payment-btn"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            `Pay $${total}`
          )}
        </span>
      </button>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      </form>
  );
}
