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
    console.log('--- Available Items ---')
    res.forEach(function(product) {
      console.log(
        'ID: ' + 
        product.item_id + ' -- ' +
        product.product_name + ' || ' +
        product.price )
    })

    
    inquirer.prompt([
      {
        type: 'input',
        name: 'productID',
        message: 'Which product would you like to buy? (Enter Product ID)'
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to purchase?'
      }
    ]).then(function(resp) {
        console.log(resp)
    })
  })
}
