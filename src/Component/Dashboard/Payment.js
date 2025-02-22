import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import useDate from '../Shared/useDate'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
// Payment JS
const CheckoutForm = ({ order, clientSecret , setShow , refetch }) => {
  const date = useDate()
  const [loading , setLoading] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(false)
  const [cardSuccess, setCardSuccess] = useState(false)

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();

    if (elements == null) {
      return;
    }
    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });
    if (error) {
      setLoading(false)
    }
    setCardError(error?.message || false)
    setCardSuccess(false)
    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: order.name,
          email: order.email
        }
      }
    })
    if (intentError) {
      setCardError(intentError?.message)
      setLoading(false)
    }
    else {
      setCardError(false)
      setCardSuccess('Payment SuccessFul')

      const payment = {
        orderName: order.name,
        transactionId: paymentIntent.id,
        email: order.email,
        date: date
      }
      fetch(`https://mobile-collections-backend.vercel.app/order/${order._id}`, {
        method: "put",
        headers: {
          'content-type': 'application/json',
          auth: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ payment, position: "paid", order })
      }).then(res => {
        setLoading(false)
        setShow(false)
        refetch()
        toast.success('Payment Success')
      })

    }
  };

  return (
    <form className='max-w-md w-full lg:px-10 pb-5 pt-4' onSubmit={handleSubmit}>
      <p className='pb-2'>Pay For : <span className='font-bold'>
      {order.name}
        </span></p>
      <p className='pb-7'>Amount : <span className="font-bold">
      ${order.totalPrice}
        </span></p>
      <CardElement />
      <button className={`btn btn-sm btn-primary ${loading && "loading"} mt-5`} type="submit" disabled={!stripe}>
        Pay
      </button>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {cardSuccess && <p className='text-green-500'>{cardSuccess}</p>}
    </form>
  );
};

const stripePromise = loadStripe('pk_test_51L0rFmLYwJHp3nTSJ5HzZEvN1aLGTsMmb95tFAezY3NleoCmxB2nygn6sDkk9ZbZcsiunYDLGfy9JOxuJbP6YheJ00jclK5Odl');

const Payment = ({ order, clientSecret , setShow , refetch }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm order={order} clientSecret={clientSecret} setShow={setShow} refetch={refetch}/>
  </Elements>
);
export default Payment
