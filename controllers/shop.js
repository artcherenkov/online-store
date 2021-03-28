const Product = require("../models/product");

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      pageTitle: "All products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { pageTitle: "Shop", path: "/", products });
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", { pageTitle: "Cart", path: "/cart" });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};
