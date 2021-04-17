const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/product-list", {
        pageTitle: "All products",
        path: "/products",
        products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.fetchById(productId)
    .then(([product]) => {
      res.render("shop/product-details", {
        pageTitle: "Product details",
        path: "/products",
        product: product[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/index", {
        pageTitle: "Shop",
        path: "/",
        products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
  let products;
  Cart.getCart((cart) => {
    if (!cart) {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        cart,
        products,
      });
    } else {
      Product.fetchAll((prods) => {
        products = cart.products.reduce((acc, cartProduct) => {
          const foundProduct = prods.find((prod) => prod.id === cartProduct.id);
          if (foundProduct) {
            const adaptedProduct = { ...foundProduct, qty: cartProduct.qty };
            return [...acc, adaptedProduct];
          }
          return acc;
        }, []);

        res.render("shop/cart", {
          pageTitle: "Cart",
          path: "/cart",
          cart,
          products,
        });
      });
    }
  });
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  Product.fetchById(productId, (product) => {
    Cart.addProduct(productId, Number(product.price));
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", { pageTitle: "Your orders", path: "/orders" });
};

exports.postCartDeleteItem = (req, res) => {
  const { productId } = req.body;
  Product.fetchById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};
