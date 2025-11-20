import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`/api/orders/${id}`);
      setOrder(res.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  return (
    <div className="order-detail-page">
      <div className="container">
        <h1>Order Details</h1>
        <div className="order-detail-content">
          <div className="order-info">
            <div className="info-section">
              <h2>Order Information</h2>
              <div className="info-row">
                <span>Order ID:</span>
                <span>#{order._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="info-row">
                <span>Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span>Status:</span>
                <span className={`status-badge status-${order.status}`}>
                  {order.status}
                </span>
              </div>
              <div className="info-row">
                <span>Payment Method:</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="info-row">
                <span>Payment Status:</span>
                <span>{order.isPaid ? 'Paid' : 'Not Paid'}</span>
              </div>
            </div>

            <div className="info-section">
              <h2>Shipping Address</h2>
              <p>
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="order-items-section">
            <h2>Order Items</h2>
            <div className="order-items-list">
              {order.orderItems.map((item) => (
                <div key={item._id || item.product} className="order-item-detail">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Items Price:</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

