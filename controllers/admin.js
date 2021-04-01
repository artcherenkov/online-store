const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
    product: null,
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body);
  product.save(product);
  res.redirect("/");
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }

  const productId = req.params.productId;
  Product.fetchById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit product",
      path: "",
      product,
      editing: true,
    });
  });
};

exports.postEditProduct = (req, res) => {
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
