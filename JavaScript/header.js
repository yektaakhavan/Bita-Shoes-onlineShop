document.addEventListener("DOMContentLoaded", function () {
    // تبدیل اعداد انگلیسی به فارسی
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

    // توابع کمکی برای قیمت
    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseInt(priceStr.replace(/\./g, '').replace(' تومان', '').trim(), 10);
    };
    const formatPrice = (num) => {
        if (!num) return "۰ تومان";
        return num.toLocaleString('fa-IR') + " تومان";
    };

    // عملکرد لایک
    const addLikeFunctionality = () => {
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
            });
        });
    };

    // کارت  همه محصولات 
    const allProductCard = (product) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        let discountBadge = "";
        let newPriceHTML = "";
        let oldPriceClass = "";
        if (product.discountPercent && product.discountPercent > 0) {
            const oldPriceNum = parsePrice(product["old-price"]);
            const newPriceNum = Math.round(oldPriceNum * (1 - product.discountPercent / 100));
            const formattedNewPrice = formatPrice(newPriceNum);
            discountBadge = `<div class="discount-badge">-${product.discountPercent}%</div>`;
            newPriceHTML = `<span class="new-price">${formattedNewPrice}</span>`;
            oldPriceClass = "has-new-price";
        }

        slide.innerHTML = `
            ${discountBadge}
            <div class="cardItem cardShape">
                <div class="card">
                    <div class="like-btn">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="shape">
                        <img loading="lazy" class="card-img-top" src="${product.img}" alt="${product.alt || product.title}">
                        <div class="card-body">
                            <a href="#" class="title">${product.title}</a>
                            <div class="product-bottom">
                                <div class="product-attributes">
                                    <ul class="size-options">
                                        <li class="size-item">40</li>
                                        <li class="size-item">41</li>
                                        <li class="size-item">42</li>
                                    </ul>
                                </div>
                                <div class="product-price">
                                    <div class="price">
                                        ${newPriceHTML}
                                        <span class="old-price ${oldPriceClass}">${product["old-price"]}</span>
                                    </div>
                                </div>
                                <div class="new-add-to-cart">
                                    <a href="#">
                                        <span class="d-flex gap-2 align-items-center">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 14.25C8.5 16.17 10.08 17.75 12 17.75C13.92 17.75 15.5 16.17 15.5 14.25" stroke="currentColor" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M8.81 2L5.19 5.63" stroke="currentColor" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M15.19 2L18.81 5.63" stroke="currentColor" stroke-width="2.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M2 7.84998C2 5.99998 2.99 5.84998 4.22 5.84998H19.78C21.01 5.84998 22 5.99998 22 7.84998C22 9.99998 21.01 9.84998 19.78 9.84998H4.22C2.99 9.84998 2 9.99998 2 7.84998Z" stroke="currentColor" stroke-width="2.3"></path>
                                                <path d="M3.5 10L4.91 18.64C5.23 20.58 6 22 8.86 22H14.89C18 22 18.46 20.64 18.82 18.76L20.5 10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"></path>
                                            </svg>
                                            <span class="cart-text">خرید</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return slide;
    };

    // کارت پرفروش‌ترین‌ها
    const createProductCard = (product) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        let discountBadge = "";
        let newPriceHTML = "";
        let oldPriceClass = "";
        if (product.discountPercent && product.discountPercent > 0) {
            const oldPriceNum = parsePrice(product["old-price"]);
            const newPriceNum = Math.round(oldPriceNum * (1 - product.discountPercent / 100));
            const formattedNewPrice = formatPrice(newPriceNum);
            discountBadge = `<div class="discount-badge">-${product.discountPercent}%</div>`;
            newPriceHTML = `<span class="new-price">${formattedNewPrice}</span>`;
            oldPriceClass = "has-new-price";
        }

        slide.innerHTML = `
            ${discountBadge}
            <div class="cardItem cardShape">
                <div class="card">
                    <div class="like-btn">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="shape">
                        <img loading="lazy" class="card-img-top" src="${product.img}" alt="${product.alt || product.title}">
                        <div class="card-body">
                            <a href="#" class="title">${product.title}</a>
                            <div class="product-bottom">
                                <div class="product-price">
                                    <div class="price">
                                        ${newPriceHTML}
                                        <span class="old-price ${oldPriceClass}">${product["old-price"]}</span>
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
        return slide;
    };

    // کارت پیشنهاد شگفت‌انگیز
    const createAlternativeProductCard = (product) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        let discountBadge = "";
        let newPriceHTML = "";
        let oldPriceClass = "";
        if (product.discountPercent && product.discountPercent > 0) {
            const oldPriceNum = parsePrice(product["old-price"]);
            const newPriceNum = Math.round(oldPriceNum * (1 - product.discountPercent / 100));
            const formattedNewPrice = formatPrice(newPriceNum);
            discountBadge = `<div class="discount-badge">${product.discountPercent} %</div>`;
            newPriceHTML = `<span class="new-price">${formattedNewPrice}</span>`;
            oldPriceClass = "has-new-price";
        }

        slide.innerHTML = `
            ${discountBadge}
            <div class="cardItem cardShape">
                <div class="card">
                    <div class="like-btn">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="shape">
                        <img loading="lazy" class="card-img-top" src="${product.img}" alt="${product.alt || product.title}">
                        <div class="card-body">
                            <a href="#" class="title">${product.title}</a>
                            <div class="product-bottom">
                                <div class="product-price">
                                    <div class="price">
                                        ${newPriceHTML}
                                        <span class="old-price ${oldPriceClass}">${product["old-price"]}</span>
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
        return slide;
    };

    // کارت نظرات کاربران
    const creatUserCommentCard = (person) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        slide.innerHTML = `
            <div class="cardItem cardShape">
                <div class="card">
                    <div class="shape row">
                        <div class="person-profile col-lg-4 d-flex flex-column gap-3">
                            <img src="${person.img}"
                                class="person-image img-fluid" alt="">
                            <p class="person-name text-start">${person.personName}</p>
                        </div>
                        <div class="person-desc col-lg-8">
                           ${person.comments}
                        </div>
                    </div>
                </div>
            </div>`;
        return slide;
    };


    // کارت مقالات وبلاگ
    const creatWeblogArticleCard = (article) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        slide.innerHTML = `
            <div class="cardItem cardShape">
                <div class="card px-3">
                    <div class="shape flex-column">
                        <svg class="me-2 weblogsvg" width="40" height="40" version="1.1"
                            id="_x32_" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00"
                            xml:space="preserve" fill="white" stroke-width="0.00512">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path class="st0"
                                        d="M421.073,221.719c-0.578,11.719-9.469,26.188-23.797,40.094v183.25c-0.016,4.719-1.875,8.719-5.016,11.844 c-3.156,3.063-7.25,4.875-12.063,4.906H81.558c-4.781-0.031-8.891-1.844-12.047-4.906c-3.141-3.125-4.984-7.125-5-11.844V152.219 c0.016-4.703,1.859-8.719,5-11.844c3.156-3.063,7.266-4.875,12.047-4.906h158.609c12.828-16.844,27.781-34.094,44.719-49.906 c0.078-0.094,0.141-0.188,0.219-0.281H81.558c-18.75-0.016-35.984,7.531-48.25,19.594c-12.328,12.063-20.016,28.938-20,47.344 v292.844c-0.016,18.406,7.672,35.313,20,47.344C45.573,504.469,62.808,512,81.558,512h298.641c18.781,0,36.016-7.531,48.281-19.594 c12.297-12.031,20-28.938,19.984-47.344V203.469c0,0-0.125-0.156-0.328-0.313C440.37,209.813,431.323,216.156,421.073,221.719z">
                                    </path>
                                    <path class="st0"
                                        d="M498.058,0c0,0-15.688,23.438-118.156,58.109C275.417,93.469,211.104,237.313,211.104,237.313 c-15.484,29.469-76.688,151.906-76.688,151.906c-16.859,31.625,14.031,50.313,32.156,17.656 c34.734-62.688,57.156-119.969,109.969-121.594c77.047-2.375,129.734-69.656,113.156-66.531c-21.813,9.5-69.906,0.719-41.578-3.656 c68-5.453,109.906-56.563,96.25-60.031c-24.109,9.281-46.594,0.469-51-2.188C513.386,138.281,498.058,0,498.058,0z">
                                    </path>
                                </g>
                            </g>
                        </svg>
                        <div class="article-title primary-text-color fw-bold my-4 text-start">${article.articleTitle}</div>
                        <div class="article-desc primary-text-100 text-start">${article.articleDesc}</div>
                        <div class="weblog-button d-flex justify-content-between align-items-center mt-4">
                            <div class="persons-name d-flex"> 
                            <svg class="me-2" width="20" height="20" fill="#ffffffff" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"
                                stroke="var(--primary-color)">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-6.24-.064H6.81a2.528 2.528 0 0 0-2.692 2.303v1.51a.794.794 0 0 0 .792.792h7.166a.794.794 0 0 0 .792-.791V11.82a2.528 2.528 0 0 0-2.692-2.302zM6.14 6.374a2.353 2.353 0 1 0 2.353-2.353A2.353 2.353 0 0 0 6.14 6.374z">
                                    </path>
                                </g>
                            </svg>
                            <div class="article-autor d-flex gap-2 justify-content-center primary-text-color">${article.authorName}</div>
                          </div>
                      
                            <div class="readMore fw-bold">
                                 بیشتر بخوانید
                                <svg class="ms-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M15 7L10 12L15 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
        return slide;
    };

    // رندر محصولات
    function renderProducts(productList, wrapperId, cardFunction) {
        const wrapper = document.querySelector(wrapperId);
        if (!wrapper) return;
        wrapper.innerHTML = '';
        if (productList.length === 0) {
            wrapper.innerHTML = '<p class="text-center w-100 py-5 text-muted">محصولی یافت نشد</p>';
            return;
        }
        productList.forEach(product => wrapper.appendChild(cardFunction(product)));
        addLikeFunctionality();
        convertNode(wrapper);
    }

    // بارگذاری داده‌های محصولات
    fetch('./json/products.json')
        .then(response => {
            if (!response.ok) throw new Error('خطا در بارگذاری فایل JSON');
            return response.json();
        })
        .then(products => {
            // دسته‌بندی thumbnails
            const catWrapper = document.getElementById('category-swiper-wrapper') || document.querySelector('#swiper-wrapper-category');
            products.forEach(product => {
                const slide = document.createElement("div");
                slide.className = "swiper-slide";
                slide.innerHTML = `
                    <div class="category-thumbnail">
                        <a class="title" href="#">
                            <img decoding="async" src="${product.img}" alt="${product.alt || product.title}">
                        </a>
                    </div>
                    <div class="category-details">
                        <a class="title" href="#" title="${product.title}">${product.title}</a>
                    </div>
                `;
                catWrapper.appendChild(slide);
            });

            // رندر سه بخش
            renderProducts(products, '#all-product-wrapper', allProductCard);
            renderProducts(products.filter(p => p.categories?.includes('Best Sellers of the Week')), '#best-sellers-wrapper', createProductCard);
            renderProducts(products.filter(p => p.categories?.includes('Amazing Offer')), '#amazing-offers-wrapper', createAlternativeProductCard);

            // Swiperها
            new Swiper('.catSwiper', {
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                spaceBetween: 10,
                slidesPerView: "auto",
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                breakpoints: { 0: { slidesPerView: 2 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 8 } }

            });

            new Swiper('.productSwiperAll', {
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                spaceBetween: 28,
                breakpoints: { 0: { slidesPerView: 1 }, 576: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 992: { slidesPerView: 4 }, 1200: { slidesPerView: 5 } }
            });

            new Swiper('.productSwiperBest', {
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                spaceBetween: 28,
                breakpoints: { 0: { slidesPerView: 1 }, 576: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 992: { slidesPerView: 4 }, 1200: { slidesPerView: 5 } }
            });

            new Swiper('.productSwiperAmazing', {
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                spaceBetween: 28,
                breakpoints: { 0: { slidesPerView: 1 }, 576: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 992: { slidesPerView: 4 }, 1200: { slidesPerView: 5 } }
            });

            new Swiper('.userComments', {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                pagination: { el: '.swiper-pagination', clickable: true },
                breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }
            });
            new Swiper('.weblogArticle', {
                slidesPerView: 3,
                spaceBetween: 10,
                loop: false,
                pagination: { el: '.swiper-pagination', clickable: true },
                breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        })
        .catch(err => console.error('خطا:', err));



    // بارگذاری داده‌های نظرات کاربران
    fetch('./json/userComments.json')
        .then(response => {
            if (!response.ok) throw new Error('خطا در بارگذاری فایل JSON');
            return response.json();
        })
        .then(persons => {


            renderProducts(persons, '#UserComments', creatUserCommentCard);

        })
        .catch(err => console.error('خطا:', err));


    fetch('./json/weblogArticle.json')
        .then(response => {
            if (!response.ok) throw new Error('خطا در بارگذاری فایل JSON');
            return response.json();
        })
        .then(articles => {


            renderProducts(articles, '#WeblogArticle', creatWeblogArticleCard);

        })
        .catch(err => console.error('خطا:', err));


    // دسته‌بندی منو  
    const categoryLinks = document.querySelectorAll('.category-link');
    const subMenus = document.querySelectorAll('.subcategory-menu');
    categoryLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const target = link.dataset.target;
            subMenus.forEach(menu => menu.classList.remove('show'));
            categoryLinks.forEach(l => l.classList.remove('active'));
            document.getElementById(target)?.classList.add('show');
            link.classList.add('active');
        });
    });
});