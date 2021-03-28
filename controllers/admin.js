const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body);
  product.save(product);
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      products,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  });
};
