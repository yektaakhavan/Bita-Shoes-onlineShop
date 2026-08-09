// صفحه سبد خرید
// از توابع سبد خرید مشترک (/JavaScript/cart.js) استفاده می‌کند: getCart, removeFromCart, setCartItemQuantity

(function () {
  const loadingEl = document.getElementById("cart-loading");
  const emptyEl = document.getElementById("cart-empty");
  const filledEl = document.getElementById("cart-filled");
  const successEl = document.getElementById("cart-checkout-success");
  const listEl = document.getElementById("cart-items-list");
  const summaryCountEl = document.getElementById("cart-summary-count");
  const summaryTotalEl = document.getElementById("cart-summary-total");

  fetch("/json/products.json")
    .then((res) => {
      if (!res.ok) throw new Error("خطا در بارگذاری اطلاعات محصولات");
      return res.json();
    })
    .then((products) => {
      loadingEl.classList.add("d-none");
      render(products);
    })
    .catch((err) => {
      console.error("خطا:", err);
      loadingEl.classList.add("d-none");
      emptyEl.classList.remove("d-none");
    });

  function render(products) {
    const cart = getCart();

    if (cart.length === 0) {
      emptyEl.classList.remove("d-none");
      filledEl.classList.add("d-none");
      return;
    }

    emptyEl.classList.add("d-none");
    filledEl.classList.remove("d-none");

    listEl.innerHTML = "";
    let total = 0;
    let totalCount = 0;

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return;

      const unitPrice = parsePrice(product["old-price"]);
      const discountedUnitPrice = product.discountPercent
        ? Math.round(unitPrice * (1 - product.discountPercent / 100))
        : unitPrice;
      const lineTotal = discountedUnitPrice * item.qty;
      total += lineTotal;
      totalCount += item.qty;

      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
                <div class="cart-item-image">
                    <img src="${product.img}" alt="${product.alt || product.title}">
                </div>
                <div class="cart-item-info">
                    <a href="/pages/product-details/productDetails.html?id=${product.id}" class="cart-item-title">${product.title}</a>
                    <span class="cart-item-unit-price">${formatPrice(discountedUnitPrice)} × واحد</span>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-qty">
                        <button type="button" class="cart-qty-minus" data-id="${product.id}" aria-label="کاهش تعداد">-</button>
                        <span class="cart-qty-value">${item.qty.toLocaleString("fa-IR")}</span>
                        <button type="button" class="cart-qty-plus" data-id="${product.id}" aria-label="افزایش تعداد">+</button>
                    </div>
                    <span class="cart-item-subtotal">${formatPrice(lineTotal)}</span>
                    <button type="button" class="cart-item-remove" data-id="${product.id}" aria-label="حذف از سبد خرید">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
      listEl.appendChild(li);
    });

    summaryCountEl.textContent = totalCount.toLocaleString("fa-IR");
    summaryTotalEl.textContent = `${formatPrice(total)}`;

    // دکمه‌های افزایش/کاهش تعداد
    listEl.querySelectorAll(".cart-qty-plus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        const item = getCart().find((i) => i.id === id);
        if (item) {
          setCartItemQuantity(id, item.qty + 1);
          render(products);
        }
      });
    });
    listEl.querySelectorAll(".cart-qty-minus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        const item = getCart().find((i) => i.id === id);
        if (item) {
          setCartItemQuantity(id, item.qty - 1);
          render(products);
        }
      });
    });
    listEl.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        removeFromCart(id);
        render(products);
      });
    });
  }

  // تسویه حساب (دمو؛ بدون درگاه پرداخت واقعی)
  document.getElementById("cart-checkout-btn")?.addEventListener("click", () => {
    saveCart([]);
    filledEl.classList.add("d-none");
    successEl.classList.remove("d-none");
  });
})();
