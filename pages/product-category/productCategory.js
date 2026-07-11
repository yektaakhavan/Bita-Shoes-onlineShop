// قسمت پرفروش ترین های هفته در سایدبار
const creatWidgetBestSalesProduct = (product) => {
  const ulProduct = document.createElement("ul");
  ulProduct.className = "best-selling-products";

  let newPriceHTML = "";
  let oldPriceClass = "";
  if (product.discountPercent && product.discountPercent > 0) {
    const oldPriceNum = parsePrice(product["old-price"]);
    const newPriceNum = Math.round(
      oldPriceNum * (1 - product.discountPercent / 100)
    );
    const formattedNewPrice = formatPrice(newPriceNum);
    newPriceHTML = `<span class="new-price">${formattedNewPrice}</span>`;
    oldPriceClass = "has-new-price";
  }

  ulProduct.innerHTML = `
        
        <li>
            <a class="d-flex flex-row gap-3 align-items-center px-3" href="#">
                <div class="sidebar-image">
                    <img loading="lazy" class="rounded-pill img-fluid" src="${
                      product.img
                    }"
                        alt="${product.alt || product.title}">
                </div>
                <div class="best-seller-product-text">
                    <h4>${product.title}</h4>
                    <span class="price">
                        <span>
                            <div class="Price-amount">
                               
                                ${newPriceHTML}
                                        <span class="old-price ${oldPriceClass}">${
    product["old-price"]
  }
                            </div>
                        </span>
                    </span>
                </div>
            </a>
        </li>
    `;
  return ulProduct;
};

// ساخت کارت های کالکشن زنانه
const creatWomanCollectionProduct = (womanProduct) => {
  const collectionProduct = document.createElement("div");
  collectionProduct.className = "woman-collection-wrapper";

  let discountBadge = "";
  let newPriceHTML = "";
  let oldPriceClass = "";
  if (womanProduct.discountPercent && womanProduct.discountPercent > 0) {
    const oldPriceNum = parsePrice(womanProduct["old-price"]);
    const newPriceNum = Math.round(
      oldPriceNum * (1 - womanProduct.discountPercent / 100)
    );
    const formattedNewPrice = formatPrice(newPriceNum);
    discountBadge = `<div class="discount-badge">-${womanProduct.discountPercent}%</div>`;
    newPriceHTML = `<span class="new-price">${formattedNewPrice}</span>`;
    oldPriceClass = "has-new-price";
  }

  collectionProduct.innerHTML = `
            ${discountBadge}
            <div class="cardItem cardShape">
                <div class="card">
                    <div class="like-btn">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="shape">
                        <img loading="lazy" class="card-img-top" src="${
                          womanProduct.img
                        }" alt="${womanProduct.alt || womanProduct.title}">
                        <div class="card-body">
                            <a href="#" class="title">${womanProduct.title}</a>
                            <div class="product-bottom">
                               
                                <div class="product-price">
                                    <div class="price">
                                        ${newPriceHTML}
                                        <span class="old-price ${oldPriceClass}">${
    womanProduct["old-price"]
  }</span>
                                    </div>
                                </div>
                                <div class="add-to-cart">
                                    <a href="#">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M0.792969 9.00002H16.793M8.79297 17V1.00002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  return collectionProduct;
};

function renderProducts(productList, wrapperId, cardFunction) {
  const wrapper = document.querySelector(wrapperId);
  if (!wrapper) return;
  wrapper.innerHTML = "";
  if (productList.length === 0) {
    wrapper.innerHTML =
      '<p class="text-center w-100 py-5 text-muted">محصولی یافت نشد</p>';
    return;
  }
  productList.forEach((product) => wrapper.appendChild(cardFunction(product)));
  addLikeFunctionality();
  convertNode(wrapper);
}

// بارگزاری داده برای پرفروش ترین های هفته در ساید بار و کالکشن زنانه اصلی
fetch("../../json/products.json")
  .then((response) => {
    if (!response.ok) throw new Error("خطا در بارگذاری فایل JSON");
    return response.json();
  })
  .then((products) => {
    renderProducts(
      products.filter((p) => p.categories?.includes("woman collection")),
      "#woman-collection",
      creatWomanCollectionProduct
    );
    renderProducts(
      products.filter((p) =>
        p.categories?.includes("Best Sellers of the Week")
      ),
      "#best-sellers-wrapper",
      creatWidgetBestSalesProduct
    );
  })
  .catch((err) => console.error("خطا:", err));

