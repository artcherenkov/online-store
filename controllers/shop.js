const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      pageTitle: "All products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.fetchById(productId, (product) =>
    res.render("shop/product-details", {
      product,
      pageTitle: "Product details",
      path: "/products",
    })
  );
};

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { pageTitle: "Shop", path: "/", products });
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", { pageTitle: "Cart", path: "/cart" });
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  Product.fetchById(productId, (product) => {
    Cart.addProduct(productId, Number(product.price));
  });
  res.redirect("/cart");
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", { pageTitle: "Your orders", path: "/orders" });
};
