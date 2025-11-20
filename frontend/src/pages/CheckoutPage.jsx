import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart, loadCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || 'USA',
      paymentMethod: 'card',
    },
  });

  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const orderData = {
        shippingAddress: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        paymentMethod: data.paymentMethod,
      };

      const res = await axios.post('/api/orders', orderData);
      await clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${res.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  const shippingPrice = cart.totalPrice > 100 ? 0 : 10;
  const taxPrice = cart.totalPrice * 0.1;
  const totalPrice = cart.totalPrice + shippingPrice + taxPrice;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Shipping Information */}
            <section className="checkout-section">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Street Address *</label>
                  <input
                    {...register('street', { required: 'Street address is required' })}
                    type="text"
                  />
                  {errors.street && (
                    <span className="error-message">{errors.street.message}</span>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    {...register('city', { required: 'City is required' })}
                    type="text"
                  />
                  {errors.city && (
                    <span className="error-message">{errors.city.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    {...register('state', { required: 'State is required' })}
                    type="text"
                  />
                  {errors.state && (
                    <span className="error-message">{errors.state.message}</span>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input
                    {...register('zipCode', {
                      required: 'Zip code is required',
                      pattern: {
                        value: /^\d{5}(-\d{4})?$/,
                        message: 'Invalid zip code format',
                      },
                    })}
                    type="text"
                  />
                  {errors.zipCode && (
                    <span className="error-message">{errors.zipCode.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Country *</label>
                  <input
                    {...register('country', { required: 'Country is required' })}
                    type="text"
                  />
                  {errors.country && (
                    <span className="error-message">{errors.country.message}</span>
                  )}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="checkout-section">
              <h2>Payment Method</h2>
              <div className="form-group">
                <select {...register('paymentMethod', { required: true })}>
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>
            </section>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.items.map((item) => (
                <div key={item._id} className="order-item">
                  <img
                    src={item.product?.image || '/placeholder.jpg'}
                    alt={item.product?.name}
                  />
                  <div className="order-item-info">
                    <h4>{item.product?.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <p className="order-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="total-row">
                <span>Tax:</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div className="total-row final">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

