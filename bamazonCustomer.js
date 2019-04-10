const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: dbPassword,
  database: "bamazon"
})

connection.connect(function(err) {
  if (err) throw err;
  startShopping();
})

function startShopping() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function(err, res) {
    res.forEach(function(product) {
      console.log(product.product_name)
    })
  })
}
