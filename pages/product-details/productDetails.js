// صفحه جزئیات محصول
// این فایل محصول مربوطه را از روی پارامتر id در URL از products.json می‌خواند
// و صفحه را با اطلاعات آن پر می‌کند.

(function () {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"), 10);

  const loadingEl = document.getElementById("pd-loading");
  const notFoundEl = document.getElementById("pd-not-found");
  const contentEl = document.getElementById("pd-content");

  const categoryLabels = {
    "woman collection": "کالکشن زنانه",
    "Best Sellers of the Week": "پرفروش‌ترین‌های هفته",
    "Amazing Offer": "پیشنهاد شگفت‌انگیز",
  };

  // مشخصات فنی نمونه (چون در داده محصولات فیلد مشخصات وجود ندارد)
  const specTemplate = [
    { label: "جنس رویه", value: "چرم مصنوعی / مش تنفس‌پذیر" },
    { label: "جنس زیره", value: "لاستیک ضدلغزش" },
    { label: "کشور سازنده", value: "ایران" },
    { label: "گارانتی", value: "۷ روز ضمانت بازگشت کالا" },
  ];

  fetch("/json/products.json")
    .then((res) => {
      if (!res.ok) throw new Error("خطا در بارگذاری اطلاعات محصول");
      return res.json();
    })
    .then((products) => {
      const product = products.find((p) => p.id === productId);
      loadingEl.classList.add("d-none");

      if (!product) {
        notFoundEl.classList.remove("d-none");
        return;
      }

      renderProduct(product, products);
      contentEl.classList.remove("d-none");
      convertNode(contentEl);
    })
    .catch((err) => {
      console.error("خطا:", err);
      loadingEl.classList.add("d-none");
      notFoundEl.classList.remove("d-none");
    });

  function renderProduct(product, allProducts) {
    document.title = `${product.title} | Bita Theme`;

    // مسیر صفحه و عنوان
    const breadcrumbEl = document.getElementById("pd-breadcrumb-current");
    if (breadcrumbEl) breadcrumbEl.textContent = product.title;

    const categoryTagEl = document.getElementById("pd-category-tag");
    if (categoryTagEl) {
      const firstCategory = product.categories?.[0];
      categoryTagEl.textContent = categoryLabels[firstCategory] || "کفش";
    }

    document.getElementById("pd-title").textContent = product.title;

    // تصویر اصلی
    const mainImageEl = document.getElementById("pd-main-image");
    mainImageEl.src = product.img;
    mainImageEl.alt = product.alt || product.title;

    // توضیحات (چون داده محصول توضیح ندارد، متن معرفی عمومی تولید می‌شود)
    const descriptionEl = document.getElementById("pd-description");
    if (descriptionEl) {
      descriptionEl.textContent = `${product.title} با کیفیت ساخت بالا و دوخت مقاوم، انتخابی مناسب برای استفاده روزمره است. طراحی این محصول با در نظر گرفتن راحتی پا و دوام بالا انجام شده و برای فصل‌های مختلف سال قابل استفاده است.`;
    }

    // مشخصات فنی
    const specsBody = document.getElementById("pd-specs-body");
    if (specsBody) {
      specsBody.innerHTML = specTemplate
        .map((spec) => `<tr><td>${spec.label}</td><td>${spec.value}</td></tr>`)
        .join("");
    }

    // قیمت و تخفیف
    const oldPriceEl = document.getElementById("pd-old-price");
    const newPriceEl = document.getElementById("pd-new-price");
    const badgeEl = document.getElementById("pd-discount-badge");

    if (product.discountPercent && product.discountPercent > 0) {
      const oldPriceNum = parsePrice(product["old-price"]);
      const newPriceNum = Math.round(
        oldPriceNum * (1 - product.discountPercent / 100)
      );
      newPriceEl.textContent = formatPrice(newPriceNum);
      oldPriceEl.textContent = product["old-price"];
      oldPriceEl.classList.add("has-new-price");
      badgeEl.textContent = `${product.discountPercent}%-`;
      badgeEl.classList.remove("d-none");
    } else {
      newPriceEl.textContent = product["old-price"];
      oldPriceEl.textContent = "";
      badgeEl.classList.add("d-none");
    }

    // انتخاب سایز
    const sizeItems = document.querySelectorAll(".pd-size-item");
    sizeItems.forEach((item) => {
      item.addEventListener("click", () => {
        sizeItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      });
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.click();
        }
      });
    });
    if (sizeItems.length) sizeItems[0].classList.add("active");

    // تعداد
    let qty = 1;
    const qtyValueEl = document.getElementById("pd-qty-value");
    const qtyMinusBtn = document.getElementById("pd-qty-minus");
    const qtyPlusBtn = document.getElementById("pd-qty-plus");

    const renderQty = () => {
      qtyValueEl.textContent = qty.toLocaleString("fa-IR");
    };

    qtyMinusBtn?.addEventListener("click", () => {
      if (qty > 1) {
        qty--;
        renderQty();
      }
    });
    qtyPlusBtn?.addEventListener("click", () => {
      qty++;
      renderQty();
    });

    // افزودن به سبد خرید (از طریق سبد خرید مشترک در cart.js)
    const addFeedbackEl = document.getElementById("pd-add-feedback");
    let feedbackTimer = null;

    document.getElementById("pd-add-to-cart")?.addEventListener("click", () => {
      addToCart(product.id, qty);
      if (addFeedbackEl) {
        addFeedbackEl.textContent = "محصول به سبد خرید اضافه شد ✓";
        addFeedbackEl.classList.add("show");
        clearTimeout(feedbackTimer);
        feedbackTimer = setTimeout(() => {
          addFeedbackEl.classList.remove("show");
        }, 2500);
      }
    });

    // علاقه‌مندی (لایک)
    const likeBtn = document.getElementById("pd-like-btn");
    likeBtn?.addEventListener("click", () => {
      const isActive = likeBtn.classList.toggle("active");
      likeBtn.setAttribute("aria-pressed", String(isActive));
    });

    // نظرات کاربران
    fetch("/json/userComments.json")
      .then((res) => {
        if (!res.ok) throw new Error("خطا در بارگذاری نظرات");
        return res.json();
      })
      .then((persons) => {
        const wrapper = document.getElementById("pd-comments-wrapper");
        if (!wrapper) return;
        persons.forEach((person) =>
          wrapper.appendChild(creatUserCommentCard(person))
        );
        convertNode(wrapper);
        new Swiper(".pd-comments-swiper", {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: { el: ".pd-comments-swiper .swiper-pagination", clickable: true },
          breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
        });
      })
      .catch((err) => console.error("خطا:", err));

    // محصولات مرتبط
    const relatedWrapper = document.getElementById("pd-related-wrapper");
    if (relatedWrapper) {
      const related = allProducts
        .filter((p) => p.id !== product.id)
        .slice(0, 8);
      related.forEach((p) => relatedWrapper.appendChild(allProductCard(p)));
      addLikeFunctionality();
      convertNode(relatedWrapper);

      new Swiper(".pd-related-swiper", {
        navigation: {
          nextEl: ".pd-related-swiper .swiper-button-next",
          prevEl: ".pd-related-swiper .swiper-button-prev",
        },
        spaceBetween: 24,
        breakpoints: {
          0: { slidesPerView: 1.2 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        },
      });
    }
  }
})();
