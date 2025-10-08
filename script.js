document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { name: "Smartphone X", category: "electronics", price: 799 },
    { name: "Laptop Z", category: "electronics", price: 1599 },
    { name: "T-shirt Pro", category: "apparel", price: 25 },
    { name: "Running Shoes", category: "apparel", price: 80 },
    { name: "Smart Lamp", category: "home", price: 45 },
    { name: "Coffee Maker", category: "home", price: 120 }
  ];

  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");
  const priceRange = document.getElementById("price");
  const priceValue = document.getElementById("price-value");
  const sortSelect = document.getElementById("sort");
  const showBtn = document.getElementById("show-btn");
  const resetBtn = document.getElementById("reset-btn");
  const productList = document.getElementById("product-list");
  const categoryButtons = document.querySelectorAll(".category-buttons button");

  priceRange.addEventListener("input", () => {
    priceValue.textContent = `₹${priceRange.value}`;
    categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categorySelect.value = button.dataset.category;
    renderProducts();
  });
});
  });

  showBtn.addEventListener("click", () => {
    renderProducts();
  });

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "all";
    priceRange.value = 2000;
    priceValue.textContent = "₹2000";
    sortSelect.value = "low";
    productList.innerHTML = "";
  });

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      categorySelect.value = button.dataset.category;
      renderProducts();
    });
  });

  function renderProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    const maxPrice = parseInt(priceRange.value);
    const sortBy = sortSelect.value;

    let filtered = products.filter(product =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.price <= maxPrice &&
      product.name.toLowerCase().includes(searchTerm)
    );

    if (sortBy === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    productList.innerHTML = "";

    if (filtered.length === 0) {
      productList.innerHTML = <p>No products found.</p>;
      return;
    }

    filtered.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product";
      card.style.animation = "fadeInUp 0.5s ease forwards";
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: ₹${product.price}</p>
      `;

      productList.appendChild(card);
    });
  }
});
 
