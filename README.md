# Bita Theme — Online Shoe Store

A sample **e-commerce shoe store** built with **HTML, CSS, Vanilla JavaScript, and Bootstrap**, without any framework or build tool.

## Preview

| Home Page | Product Category | Product Details |
| --------- | ---------------- | --------------- |
|           |                  |                 |

A responsive mobile version is available in `docs/screenshots/responsive-*.png`.

## Features

* Home page with best-selling products, special offers, women's collection, customer reviews, and blog articles
* Product category page with a best-sellers sidebar
* Product details page with:

  * Product gallery
  * Size selection
  * Quantity selector
  * Add to cart
  * Description / specifications / reviews tabs
  * Related products
* Functional shopping cart with `localStorage` persistence:

  * Add products from any product card or product details page
  * View and update quantities
  * Remove products
  * Demo checkout in `pages/cart/`
* Fully Persian and **RTL** interface
* Custom **YekanBakh** font
* Automatic conversion of English numbers to Persian numerals throughout the website
* Data-driven architecture: products, reviews, and blog articles are loaded from JSON files in `json/`

## Technologies

* HTML5
* CSS3
* JavaScript (Vanilla)
* Bootstrap 5 (RTL)
* Swiper.js

## Project Structure

```text
Bita_Theme/
├── index.html                      # Home page
├── JavaScript/                     # Global scripts and utilities
├── Styles/                         # Global styles
├── json/                           # Product, review, and article data
├── package/                        # Third-party libraries (Bootstrap, Swiper)
├── assets/                         # Fonts and images
├── pages/
│   ├── product-category/           # Product category page
│   ├── product-details/            # Product details page
│   └── cart/                       # Shopping cart page
└── docs/screenshots/               # Preview screenshots for this README
```

## Getting Started

Since the project uses absolute paths such as `/Styles/...` and `/json/...`, it must be served through a local web server instead of being opened directly in the browser.

### Using `serve`

```bash
npx serve .
```

### Using VS Code

Alternatively, you can run the project using the **Live Server** extension in VS Code.
