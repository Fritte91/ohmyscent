# Payment Integration Guide

This document provides guidance on integrating payment gateways into the Oh My Scent! checkout flow.

## Current Structure

The checkout page (`src/pages/Checkout.jsx`) is designed to easily accommodate payment gateway integration. The form collects:

- **Shipping Information**: Full customer details and address
- **Order Summary**: Items, subtotal, shipping, and total
- **Payment Method**: Currently a placeholder section ready for integration

## Integration Steps

### 1. Choose a Payment Gateway

Popular options for Thailand:
- **Stripe** - International, supports Thai Baht
- **Omise** - Popular in Thailand
- **2C2P** - Thai payment gateway
- **PayPal** - International option
- **PromptPay/QR Code** - Local Thai payment method

### 2. Install Payment SDK

Example with Stripe:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### 3. Add Payment Component

Create a payment component in `src/components/PaymentMethod.jsx`:

```jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your-publishable-key');

const PaymentMethod = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};
```

### 4. Update Checkout Page

In `src/pages/Checkout.jsx`, replace the payment placeholder section:

```jsx
// Replace this section:
<div className="bg-paper border-2 border-ink rounded-xl p-6 shadow-hard">
  <h2 className="font-display text-2xl mb-6">{t('checkout.paymentMethod')}</h2>
  <p className="opacity-70 text-sm">{t('checkout.paymentNote')}</p>
</div>

// With:
<PaymentMethod amount={total} />
```

### 5. Handle Payment Processing

Update the `handleSubmit` function in `Checkout.jsx`:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Process payment through your gateway
    const paymentResult = await processPayment({
      amount: total,
      currency: 'THB',
      customer: formData,
      items: cartItems,
    });
    
    if (paymentResult.success) {
      // Clear cart
      clearCart();
      
      // Redirect to success page
      navigate(`/order-success/${paymentResult.orderId}`);
    } else {
      // Handle error
      alert('Payment failed. Please try again.');
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert('An error occurred. Please try again.');
  }
};
```

### 6. Environment Variables

Create a `.env` file for API keys (never commit this):

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_SECRET_KEY=sk_test_...
VITE_API_URL=https://api.example.com
```

Access in code:
```jsx
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
```

### 7. Backend Requirements

You'll need a backend API to:
- Create payment intent/transaction
- Handle webhooks for payment confirmation
- Process orders
- Send confirmation emails

Example endpoint structure:
```
POST /api/payments/create-intent
POST /api/payments/confirm
POST /api/orders
GET  /api/orders/:id
```

### 8. Security Considerations

- Never store credit card data on frontend
- Use HTTPS in production
- Validate all input on backend
- Implement rate limiting
- Use secure payment SDKs (PCI compliant)
- Store only necessary customer data

### 9. Testing

- Use test mode/test cards from your payment provider
- Test successful payments
- Test failed payments
- Test payment cancellation
- Test various error scenarios

### 10. Production Checklist

- [ ] Switch to production API keys
- [ ] Set up webhook endpoints
- [ ] Configure SSL certificate
- [ ] Set up error logging
- [ ] Configure email notifications
- [ ] Test with real payment methods (small amounts)
- [ ] Set up order management system
- [ ] Configure refund process

## Recommended Flow

1. User fills shipping form
2. User selects/enters payment method
3. Frontend creates payment intent with backend
4. User confirms payment
5. Payment gateway processes payment
6. Backend receives webhook confirmation
7. Order is created and confirmed
8. User receives confirmation
9. Cart is cleared
10. User is redirected to success page

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Omise Documentation](https://www.omise.co/docs)
- [2C2P Documentation](https://developer.2c2p.com/)
- [PayPal Developer](https://developer.paypal.com/)

---

**Note**: This is a preparation guide. Actual implementation will depend on your chosen payment gateway and backend architecture.

