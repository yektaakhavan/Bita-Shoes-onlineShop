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
  return parseInt(priceStr.replace(/\./g, "").replace(" تومان", "").trim(), 10);
};
const formatPrice = (num) => {
  if (!num) return "۰ تومان";
  return num.toLocaleString("fa-IR") + " تومان";
};

// عملکرد لایک
const addLikeFunctionality = () => {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle("active");
    });
  });
};
