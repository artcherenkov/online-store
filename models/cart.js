const fs = require("fs");
const path = require("path");
const { getFormattedPrice } = require("../utils/common");

const pathToCartData = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(pathToCartData, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (!existingProduct) {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      } else {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      }
      cart.totalPrice += productPrice;
      cart.totalPrice = Number(parseFloat(cart.totalPrice).toFixed(2));

      fs.writeFile(pathToCartData, JSON.stringify(cart), (err) => {});
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(pathToCartData, (err, fileContent) => {
      if (err) {
        return null;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };

      const productToDelete = updatedCart.products.find((p) => p.id === id);
      if (!productToDelete) {
        return;
      }
      const productToDeleteQty = productToDelete.qty;

      updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
      updatedCart.totalPrice =
        updatedCart.totalPrice - price * productToDeleteQty;
      updatedCart.totalPrice = getFormattedPrice(updatedCart.totalPrice);

      fs.writeFile(pathToCartData, JSON.stringify(updatedCart), (err) => {});
    });
  }

  static getCart(cb) {
    fs.readFile(pathToCartData, (err, fileContent) => {
      try {
        const cart = JSON.parse(fileContent);
        cb(cart);
      } catch (err) {
        cb(null);
      }
    });
  }
};
