

document.addEventListener("DOMContentLoaded", function () {
    // convert english number to persion number
    const faMap = "۰۱۲۳۴۵۶۷۸۹";
    const toFa = (str) => str.replace(/[0-9]/g, (d) => faMap[d]);

    const convertNode = (node) => {
        if (node.nodeType === 3) {
            if (/\d/.test(node.textContent)) {
                node.textContent = toFa(node.textContent);
            }
        } else if (node.nodeType === 1) {
            node.childNodes.forEach(convertNode);
        }
    };

    convertNode(document.body);


    // basket-empty-tooltip
    const cartCount = document.getElementById('cart-count');
    const emptyTooltip = document.getElementById('basket-empty-tooltip');

    function updateBasketTooltip() {
        if (cartCount && emptyTooltip) {
            const count = parseInt(cartCount.textContent) || 0;
            if (count > 0) {
                emptyTooltip.style.display = 'none';
            }
        }
    }

    // اجرای اولیه و در صورت تغییر تعداد
    updateBasketTooltip();

    // اگر در آینده تعداد آیتم‌ها تغییر کرد (مثلاً با افزودن محصول)
    // می‌توانید این تابع را دوباره فراخوانی کنید
    // مثلاً: updateBasketTooltip();


    // #category-thumbnail
    fetch('./products.json')
        .then(response => response.json())
        .then(products => {
            const swiperWrapper = document.querySelector(".swiper-wrapper");

            products.forEach(product => {
                const slide = document.createElement("div");
                slide.className = "swiper-slide";

                slide.innerHTML = `
                    <div class="category-thumbnail">
                        <a class="title" href="#">
                            <img decoding="async" src="${product.img}" alt="${product.alt}">
                        </a>
                    </div>
                    <div class="category-details">
                        <a class="title" href="#" title="${product.title}">
                            ${product.title}
                        </a>
                    </div>
                `;

                swiperWrapper.appendChild(slide);
            });


            if (typeof swiper !== "undefined") {
                swiper.update();
            }
        })
        .catch(err => console.error("خطا در بارگذاری محصولات:", err));


    const categoryLinks = document.querySelectorAll('.category-link');
    const subMenus = document.querySelectorAll('.subcategory-menu');

    categoryLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const target = link.dataset.target;

            subMenus.forEach(menu => menu.classList.remove('show'));
            categoryLinks.forEach(l => l.classList.remove('active'));

            document.getElementById(target).classList.add('show');
            link.classList.add('active');
        });
    });


    // **********************************************************************


    new Swiper(".catSwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        spaceBetween: 30,
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 8,
                spaceBetween: 30,
            }
        }
    });

    // **********************************************************************

    // تابع برای افزودن عملکرد لایک به دکمه‌های قلب
    const addLikeFunctionality = () => {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
            });
        });
    };

    // تابع ایجاد کارت محصول بر اساس ساختار JSON
    const createProductCard = (product) => {
        const cardItem = document.createElement("div");
        cardItem.className = "cardItem cardShape";

        // ساخت بخش قیمت قدیمی (فقط اگر وجود داشته باشد)
        const oldPriceHTML = product["old-price"]
            ? `<span class="old-price">${product["old-price"]}</span>`
            : "";

        cardItem.innerHTML = `
            <div class="card">
                <div class="like-btn"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier"
                stroke-width="0">
                </g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z"
                    fill="currentColor"> 
                         </path>
                        </g>
                    </svg>
                </div>
                <div class="shape">
                    <img loading="lazy" class="card-img-top" src="${product.img}" alt="${product.alt || product.title}">
                    <div class="card-body">
                        <a href="#" class="title">${product.title}</a>
                        <div class="product-bottom">
                            <div class="product-price">
                                <div class="price">
                                    ${oldPriceHTML}
                                    <span class="new-price">
                                        ${product["new-price"]}
                                    </span>
                                </div>
                            </div>
                            <div class="add-to-cart">
                                <a href="#" class="">
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                        >
                                            <path
                                                d="M0.792969 9.00002H16.793M8.79297 17V1.00002"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            ></path>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return cardItem;
    };
    // بارگذاری و نمایش محصولات در سه بخش
    fetch('./products.json')
        .then(response => {
            if (!response.ok) throw new Error('خطا در بارگذاری فایل JSON');
            return response.json();
        })
        .then(products => {
            const bestSellers = products.filter(p => p.categories?.includes('Best Sellers of the Week'));
            const amazingOffers = products.filter(p => p.categories?.includes('Amazing Offer'));

            function renderSection(productList, wrapperId, btnId) {
                const wrapper = document.querySelector(wrapperId);
                const btn = document.getElementById(btnId);

                if (productList.length === 0) {
                    wrapper.innerHTML = '<p class="text-center w-100 py-5 text-muted">محصولی یافت نشد</p>';
                    btn.style.display = 'none';
                    return;
                }

                const limited = productList.slice(0, 20);
                const initial = limited.slice(0, 5);

                initial.forEach(product => wrapper.appendChild(createProductCard(product)));
                addLikeFunctionality();
                convertNode(wrapper);

                if (limited.length > 5) {
                    btn.style.display = 'block';
                    btn.onclick = () => {
                        limited.slice(5).forEach(product => wrapper.appendChild(createProductCard(product)));
                        addLikeFunctionality();
                        convertNode(wrapper);
                        btn.style.display = 'none';
                    };
                } else {
                    btn.style.display = 'none';
                }
            }

            renderSection(bestSellers, '#best-sellers-wrapper', 'best-sellers-show-more');
            renderSection(amazingOffers, '#amazing-offers-wrapper', 'amazing-show-more');
        })
        .catch(err => console.error('خطا:', err));


    function startCountdown() {
        const boxes = document.querySelectorAll('.offer-box');
        boxes.forEach(box => {
            const timerElement = box.querySelector('.offer-timer');
            if (!timerElement) return;

            const time = box.getAttribute('data-time') || '00:00';
            const [hours, minutes] = time.split(':');
            const targetDate = new Date(2028, 3, 1, parseInt(hours), parseInt(minutes), 0);

            const interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;

                if (distance < 0) {
                    clearInterval(interval);
                    timerElement.innerHTML = '<span style="font-size:1.6em; font-weight:bold; color:var(--color-secondary100);">منقضی شد!</span>';
                    timerElement.classList.add('expired');
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

                if (document.getElementById('days')) document.getElementById('days').textContent = days.toLocaleString('fa-IR');
                if (document.getElementById('hours')) document.getElementById('hours').textContent = hrs.toLocaleString('fa-IR').padStart(2, '۰');
                if (document.getElementById('minutes')) document.getElementById('minutes').textContent = mins.toLocaleString('fa-IR').padStart(2, '۰');
            }, 1000);
        });
    }

    startCountdown();

});
