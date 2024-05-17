// import React from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
//
// const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');
//
// const CheckoutForm = ({ sessionId }) => {
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//
//         const { error } = await stripe.redirectToCheckout({
//             sessionId,
//         });
//
//         if (error) {
//             console.error(error);
//         }
//     };
//
//     return (
//         <Elements stripe={stripePromise}>
//             <form onSubmit={handleSubmit}>
//                 {/* Add your checkout form fields here */}
//                 <button type="submit">Pay Now</button>
//             </form>
//         </Elements>
//     );
// };
//
// export default CheckoutForm;