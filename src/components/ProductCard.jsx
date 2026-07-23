function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="image-box">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <span className="category-badge">
        {product.category}
      </span>

      <h3 className="product-title">
        {product.title}
      </h3>

      <div className="rating-box">
        ⭐ {product.rating.rate}
        <span> ({product.rating.count} Reviews)</span>
      </div>

      <div className="price-row">
        <h2 className="price">
          ${product.price}
        </h2>

        <span className="stock">
          In Stock
        </span>
      </div>

      <button className="buy-btn">
        🛒 Buy Now
      </button>
    </div>
  );
}

export default ProductCard;