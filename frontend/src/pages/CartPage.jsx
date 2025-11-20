import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './CartPage.css';

const CartPage = () => {
  const { cart, loading, updateCartItem, removeFromCart, loadCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      loadCart();
    }
  }, [isAuthenticated]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.product?.image || '/placeholder.jpg'}
                  alt={item.product?.name}
                />
                <div className="cart-item-info">
                  <h3>
                    <Link to={`/products/${item.product?._id}`}>
                      {item.product?.name}
                    </Link>
                  </h3>
                  <p className="cart-item-category">
                    {item.product?.category}
                  </p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cart.totalPrice?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>
                {cart.totalPrice > 100 ? 'Free' : '$10.00'}
              </span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>
                $
                {(
                  cart.totalPrice +
                  (cart.totalPrice > 100 ? 0 : 10) +
                  cart.totalPrice * 0.1
                ).toFixed(2)}
              </span>
            </div>
            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

