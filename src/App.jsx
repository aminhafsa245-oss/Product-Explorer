import { useEffect, useMemo, useState } from "react";
import "./app.css";
import { getProducts } from "./services/api";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, category, sort]);

  if (loading) {
  return (
    <div className="loading-screen">
      <div className="loader"></div>

      <h2>Loading Products...</h2>

      <p>Please wait while we fetch the latest products.</p>
    </div>
  );
}

  if (error) {
  return (
    <div className="loading-screen">

      <h1>⚠️</h1>

      <h2>{error}</h2>

      <p>
        Unable to connect to the API.
        Please check your internet connection or try again later.
      </p>

    </div>
  );
}

  return (
    <div className="container">

      <nav className="navbar">
  <div className="logo">
    🛍️ Product Explorer
  </div>

  <ul className="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#products">Products</a></li>
    <li><a href="#about">About</a></li>
  </ul>
</nav>

      <section id="home" className="hero">

  <h1>🛍️ Product Explorer</h1>

  <p>
    Explore products instantly using the Fake Store API.
    Search, filter, and sort products in a clean React application.
  </p>

</section>

      <div className="controls">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className="filters">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="All">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewellery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>

          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >

            <option value="default">Sort By</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>

          </select>

        </div>

      </div>

      <div className="stats-container">

  <div className="stat-box">
    <h2>{filteredProducts.length}</h2>
    <p>Products</p>
  </div>

  <div className="stat-box">
    <h2>4</h2>
    <p>Categories</p>
  </div>

  <div className="stat-box">
    <h2>Live</h2>
    <p>API Status</p>
  </div>

</div>

      {filteredProducts.length === 0 ? (
        <div className="empty">

         <h2>🔍 No Products Found</h2>

<p>
We couldn't find any products matching your search.
Try another keyword or category.
</p>

        </div>
      ) : (
    <section id="products">  
  <div className="grid">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>
        </section>
      )}

      <footer id="about" className="footer">
  <h3>🛍️ Product Explorer</h3>

  <p>Built with React, Vite & Fake Store API</p>

  <div className="footer-links">
    <a href="#home">Home</a>
    <a href="#products">Products</a>
    <a href="#about">About</a>
  </div>

  <p className="copyright">
    © 2026 Product Explorer. All Rights Reserved.
  </p>
</footer>

<ScrollToTop />

    </div>
  );
}

export default App;