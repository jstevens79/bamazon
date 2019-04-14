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
  startManaging();
})

function continueOrExit() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'Would you like to do anything else?'
    }
  ]).then(function(conf) {
    if (conf.continue) {
      startManaging();
    } else {
      console.log("\n----------------------\n");
      console.log("Goodbye!");
      connection.end();
    }
  })
}

function startManaging() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      choices: [
        'View products for sale',
        'View low inventory',
        'Add to inventory',
        'Add new product'
      ]
    }
  ]).then(function(resp) {
    switch (resp.option) {
      case 'View products for sale':
        viewProducts();
        break;

      case 'View low inventory':
        viewLowInventory();
        break;

      case 'Add to inventory':
        addToInventory();
        break;

      case 'Add new product':
        addNewProduct();
        break;

    }
  })

}

function viewProducts() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    console.log('\n--- Products for Sale ---\n');
    res.forEach(function(product) {
      console.log(
        'ID: ' + 
        product.item_id + ' -- ' +
        product.product_name + ' || ' +
        '$' + product.price.toFixed(2) + ' || ' +
        'qty: ' + product.stock_quantity );
    })
    console.log("\n----------------------\n");
    continueOrExit();    
  })
}

function viewLowInventory() {
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  console.log('\n--- Inventory is low for these products ---\n');
  connection.query(query, function(err, res) {
    res.forEach(function(product) {
      console.log(
        'ID: ' + 
        product.item_id + ' -- ' +
        product.product_name + ' || ' +
        '$' + product.price.toFixed(2) + ' || ' +
        'qty: ' + product.stock_quantity );
    })
    console.log("\n----------------------\n");
    continueOrExit();   
  })
}

function addToInventory() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: "Enter the ID of the product for which you wish to update it's quantity."
    },
    {
      type: 'input',
      name: 'qty',
      message: "How many of this item would you like to add?"
    },
  ]).then(function(res) {
    var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id=?";
    connection.query(query, [res.qty, res.id], function(err, resp) {
      if (err) throw err;
      connection.query("SELECT * from products WHERE item_id=?", res.id, function(err,row) {
        if (err) throw err;
        row.forEach(function(product) {
          console.log(
            'ID: ' + 
            product.item_id + ' -- ' +
            product.product_name + ' || ' +
            '$' + product.price.toFixed(2) + ' || ' +
            'UPDATED qty: ' + product.stock_quantity );
        })
        console.log("\n----------------------\n");
        continueOrExit();  
      })
    })
  })
}

function addNewProduct() {
  console.log('\n--- Add a new product ---\n');
  inquirer.prompt([
    {
      type: 'input',
      name: 'product_name',
      message: "Product name:"
    },
    {
      type: 'input',
      name: 'department',
      message: "Product department:"
    },
    {
      type: 'input',
      name: 'price',
      message: "Product price:"
    },
    {
      type: 'input',
      name: 'stock_quantity',
      message: "Available quantity:"
    },
  ]).then(function(resp) {
    var price = parseInt(resp.price, 10).toFixed(2);
    var quantity = parseInt(resp.stock_quantity, 10);
    var query = "INSERT INTO products" + 
                "(product_name, department_name, price, stock_quantity)" +
                "VALUES (?, ?, ?, ?)"
    connection.query(query, [resp.product_name, resp.department, price, quantity], function(err, res) {
      if (err) throw err;
      connection.query("SELECT * FROM products WHERE product_name=?", resp.product_name, function(err, row) {
        if (err) throw err;
        console.log('\n--- New Product Added: ---\n');
        row.forEach(function(product) {
          console.log(
            'ID: ' + 
            product.item_id + ' -- ' +
            product.product_name + ' || ' +
            '$' + product.price.toFixed(2) + ' || ' +
            'UPDATED qty: ' + product.stock_quantity );
        })
        console.log("\n----------------------\n");
        continueOrExit();  
      })
    })
  })
}
