DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(100),
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("Luxury Dog Bed", "Pets", 120.80, 8),
		("Mid Century TV Stand", "Home", 210.99, 20),
		("Oscar The Grouch Inspirational Calendar", "Office", 14.05, 3),
		("6' Garden Gnome", "Garden", 410.00, 50),
		("Stranger Things Hawkins High T-Shirt", "Apparel", 22.00, 10),
		("Shark Dog Costume", "Pets", 24.25, 3),
		("Herman Miller Chair", "Office", 1200.00, 2),
		("Center for Ants Yard Decoration", "Garden", 80.75, 12),
		("Lederhosen", "Apparel", 30.02, 8),
		("Kitchen Faucet by Farrah", "Home", 228.50, 0);