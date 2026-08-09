// سبد خرید مشترک بین تمام صفحات
// داده‌ها در localStorage ذخیره می‌شوند: [{ id, qty }, ...]

const CART_STORAGE_KEY = "bita-cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const cart = raw ? JSON.parse(raw) : [];
    return Array.isArray(cart) ? cart : [];
  } catch (err) {
    console.error("خطا در خواندن سبد خرید:", err);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartUI(cart);
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
}

function setCartItemQuantity(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  if (qty < 1) {
    removeFromCart(productId);
    return;
  }
  item.qty = qty;
  saveCart(cart);
}

function getCartCount(cart = getCart()) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// آپدیت نشان تعداد (badge) و پنل کوچک سبد خرید در هدر
function updateCartUI(cart = getCart()) {
  const count = getCartCount(cart);

  document.querySelectorAll(".cart-badge").forEach((el) => {
    el.textContent = count.toLocaleString("fa-IR");
  });

  const tooltip = document.getElementById("basket-empty-tooltip");
  if (!tooltip) return;

  if (count === 0) {
    tooltip.innerHTML = `
            <div class="tooltip-arrow"></div>
            <div class="tooltip-content">
                <div class="empty-cart-row d-flex align-items-center gap-3">
                    <div class="empty-icon-wrapper flex-shrink-0">
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="empty-basket-icon">
                            <path d="M8.5 14.25C8.5 16.17 10.08 17.75 12 17.75C13.92 17.75 15.5 16.17 15.5 14.25" stroke="currentColor" stroke-width="0.864" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8.81 2L5.19 5.63" stroke="currentColor" stroke-width="0.864" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M15.19 2L18.81 5.63" stroke="currentColor" stroke-width="0.864" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M2 7.84998C2 5.99998 2.99 5.84998 4.22 5.84998H19.78C21.01 5.84998 22 5.99998 22 7.84998C22 9.99998 21.01 9.84998 19.78 9.84998H4.22C2.99 9.84998 2 9.99998 2 7.84998Z" stroke="currentColor" stroke-width="0.864"></path>
                            <path d="M3.5 10L4.91 18.64C5.23 20.58 6 22 8.86 22H14.89C18 22 18.46 20.64 18.82 18.76L20.5 10" stroke="currentColor" stroke-width="0.864" stroke-linecap="round"></path>
                        </svg>
                    </div>
                    <div class="text-part">
                        <p class="message fw-semibold text-dark mb-1">سبد خرید خالی است</p>
                        <p class="sub-message text-muted small mb-0">هیچ موردی وجود ندارد</p>
                    </div>
                </div>
                <a href="/pages/product-category/productCategory.html" class="btn start-shopping-btn d-block mx-auto rounded-pill px-4 py-2 mt-3">شروع خرید</a>
            </div>
        `;
  } else {
    tooltip.innerHTML = `
            <div class="tooltip-arrow"></div>
            <div class="tooltip-content">
                <div class="empty-cart-row d-flex align-items-center gap-3">
                    <div class="text-part">
                        <p class="message fw-semibold text-dark mb-1">${count.toLocaleString(
                          "fa-IR"
                        )} کالا در سبد خرید شما</p>
                        <p class="sub-message text-muted small mb-0">برای مشاهده و تسویه کلیک کنید</p>
                    </div>
                </div>
                <a href="/pages/cart/cart.html" class="btn start-shopping-btn d-block mx-auto rounded-pill px-4 py-2 mt-3">مشاهده سبد خرید</a>
            </div>
        `;
  }
}

// افزودن به سبد با کلیک روی هر دکمه‌ای که data-add-to-cart دارد (در هر جای صفحه)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add-to-cart]");
  if (!btn) return;
  e.preventDefault();
  const id = parseInt(btn.getAttribute("data-add-to-cart"), 10);
  if (!id) return;
  addToCart(id, 1);
  btn.classList.add("added");
  setTimeout(() => btn.classList.remove("added"), 900);
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  // نمایش/بستن پنل کوچک سبد خرید در هدر
  const basketToggle = document.querySelector(".basket");
  const basketTooltip = document.getElementById("basket-empty-tooltip");
  if (basketToggle && basketTooltip) {
    basketToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      basketTooltip.classList.toggle("show");
    });
    document.addEventListener("click", (e) => {
      if (
        !basketTooltip.contains(e.target) &&
        !basketToggle.contains(e.target)
      ) {
        basketTooltip.classList.remove("show");
      }
    });
  }
});
