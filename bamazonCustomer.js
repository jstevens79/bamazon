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
    console.log('\n--- Available Items ---\n');
    res.forEach(function(product) {
      console.log(
        'ID: ' + 
        product.item_id + ' -- ' +
        product.product_name + ' || ' +
        '$' + product.price.toFixed(2) );
    })
    console.log("\n----------------------\n");

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
        // get item by id
        var productID = resp.productID;
        var quantity = parseInt(resp.quantity, 10);

        var query = "SELECT * FROM products WHERE item_id=?"
        connection.query(query, resp.productID, function(err, res) {
          var item = res[0];
         if (item.stock_quantity >= quantity) {
           var newQuantity = item.stock_quantity - quantity;
           var queryUpdate = "UPDATE products SET stock_quantity=? WHERE item_id=?";
           var total = quantity * item.price;
           totalPrice = total.toFixed(2);

           connection.query(queryUpdate, [newQuantity, productID], function(err, res) {
             console.log("\n----------------------\n");
             console.log("PURCHASE SUCCESS: You spent $" + totalPrice + "\n");
             console.log("----------------------\n");
             continueOrQuit();
           })

         } else {
           console.log("\n----------------------\n");
           console.log("Sorry, this item doesn't have enough in stock to fulfill your order.\n");
           console.log("----------------------\n");
           continueOrQuit();
         }
         
        })

    })
  })
}


function continueOrQuit() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'Continue shopping?'
    }
  ]).then(function(conf) {
    if (conf.continue) {
      startShopping();
    } else {
      console.log("\n----------------------\n");
      console.log("Thanks for shopping. Goodbye!");
      connection.end();
    }
  })
}