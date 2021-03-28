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
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(pathToData, JSON.stringify(products), (err) => {});
    });
  }

  static fetchAll(cb) {
    return getProductsFromFile(cb);
  }
};
