const fs = require("fs");
const path = require("path");

const pathToData = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(pathToData, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(pathToData, JSON.stringify(updatedProducts), (err) => {});
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(pathToData, JSON.stringify(products), (err) => {});
      }
    });
  }

  static fetchAll(cb) {
    return getProductsFromFile(cb);
  }

  static fetchById(id, cb) {
    return getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }
};
