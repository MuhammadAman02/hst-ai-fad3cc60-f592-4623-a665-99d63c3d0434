import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CreditCard, Lock } from 'lucide-react';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('pk_test_51234567890abcdef...' || 'pk_test_placeholder');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('29.99');
  const [email, setEmail] = useState('');

  console.log('CheckoutForm rendered, stripe:', !!stripe, 'elements:', !!elements);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted');

    if (!stripe || !elements) {
      console.error('Stripe not loaded');
      toast.error('Stripe not loaded. Please try again.');
      return;
    }

    setLoading(true);
    console.log('Processing payment for amount:', amount, 'email:', email);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('Card element not found');
      toast.error('Card element not found');
      setLoading(false);
      return;
    }

    try {
      // In a real app, you would create a payment intent on your backend
      // For demo purposes, we'll simulate the process
      console.log('Simulating payment processing...');
      
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: email,
        },
      });

      if (error) {
        console.error('Payment method creation failed:', error);
        toast.error(error.message || 'Payment failed');
      } else {
        console.log('Payment method created successfully:', paymentMethod);
        toast.success('Payment processed successfully! (Demo mode)');
        
        // Reset form
        setEmail('');
        setAmount('29.99');
        cardElement.clear();
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      toast.error('An unexpected error occurred');
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <CreditCard className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Secure Payment</CardTitle>
        <CardDescription>
          Complete your purchase securely with Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Card Details</Label>
            <div className="p-3 border rounded-md bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!stripe || loading}
          >
            <Lock className="h-4 w-4 mr-2" />
            {loading ? 'Processing...' : `Pay $${amount}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            <Lock className="h-3 w-3 inline mr-1" />
            Your payment information is secure and encrypted
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

const Stripe = () => {
  console.log('Stripe page component rendered');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stripe Payment Integration
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience secure payment processing with Stripe. This demo shows how to integrate 
            Stripe Elements into your React application for seamless transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Secure Processing</p>
                    <p className="text-sm text-gray-600">PCI DSS compliant payment handling</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Multiple Payment Methods</p>
                    <p className="text-sm text-gray-600">Credit cards, debit cards, and more</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Real-time Validation</p>
                    <p className="text-sm text-gray-600">Instant feedback on card details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Mobile Optimized</p>
                    <p className="text-sm text-gray-600">Works perfectly on all devices</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Demo Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700 text-sm">
                  This is a demonstration. Use test card number <code className="bg-yellow-200 px-1 rounded">4242 4242 4242 4242</code> 
                  with any future expiry date and any 3-digit CVC.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stripe;