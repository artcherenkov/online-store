const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./utils/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/404");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
