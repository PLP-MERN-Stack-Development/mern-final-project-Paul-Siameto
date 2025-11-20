import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/reviews/products/${id}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    const result = await addToCart(product._id, quantity);
    if (result.success) {
      setQuantity(1);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }

    try {
      await axios.post(`/api/reviews/products/${id}/reviews`, reviewForm);
      toast.success('Review submitted successfully!');
      setReviewForm({ rating: 5, comment: '' });
      fetchReviews();
      fetchProduct(); // Refresh product to update rating
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <img src={product.image} alt={product.name} />
            {product.images && product.images.length > 0 && (
              <div className="product-images-thumbnails">
                {product.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`${product.name} ${idx + 1}`} />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="product-meta">
              <span className="product-category">{product.category}</span>
              <div className="product-rating">
                ⭐ {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </div>
            </div>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>

            {product.stock > 0 ? (
              <div className="product-actions">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                  <span className="stock-info">({product.stock} available)</span>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="out-of-stock-message">Out of Stock</div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Reviews</h2>
          <div className="reviews-content">
            <div className="reviews-list">
              {reviews.length === 0 ? (
                <p>No reviews yet. Be the first to review!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="review-item">
                    <div className="review-header">
                      <strong>{review.user?.name || 'Anonymous'}</strong>
                      <div className="review-rating">
                        {'⭐'.repeat(review.rating)}
                      </div>
                      <span className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.comment && <p>{review.comment}</p>}
                  </div>
                ))
              )}
            </div>

            {/* Review Form */}
            {isAuthenticated && (
              <div className="review-form">
                <h3>Write a Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="form-group">
                    <label>Rating</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, rating: Number(e.target.value) })
                      }
                    >
                      <option value={5}>5 ⭐</option>
                      <option value={4}>4 ⭐</option>
                      <option value={3}>3 ⭐</option>
                      <option value={2}>2 ⭐</option>
                      <option value={1}>1 ⭐</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Comment</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, comment: e.target.value })
                      }
                      rows="4"
                      placeholder="Share your thoughts about this product..."
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

