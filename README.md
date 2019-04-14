# Bamazon
An Amazon-like CLI project for class. View and "purchase" products as a customer, or view update inventory as a manger.

## Technologies
- MySQL
- Node
  - mysql
  - inquirer
  - dotenv

## Installation
1. Clone or download the repository. Run `npm install` to get load the required dependencies.
2. Run the SQL commands included in the store-setup.sql file to generate a MySQL database.
3. Create a .env file in the root of the directory, and add `DB_PASSWORD=[your MySQL password]`.
4. In your CLI, run `node bamazonCustomer` to view the customer interface.
5. Or, run `node bamazonManager` to view the manager interface.

## Screenshots
### Customer
Customer start
![Customer start page](./images/customer/bamazon-customer-01.png)
<!-- .element height="50%" width="50%" -->
Customer purchase success
![Customer purchase success](./images/customer/bamazon-customer-02.png)
<!-- .element height="50%" width="50%" -->
Customer purchase fail
![Customer purchase fail](./images/customer/bamazon-customer-03.png)
<!-- .element height="50%" width="50%" -->
Customer exit
![Customer exit](./images/customer/bamazon-customer-04.png)
<!-- .element height="50%" width="50%" -->

### Manager
Manager start
![Manager start](./images/manager/bamazon-manager-01.png)
<!-- .element height="50%" width="50%" -->
Manager view products
![Manager view products](./images/manager/bamazon-manager-02.png)
<!-- .element height="50%" width="50%" -->
Manager view low inventory
![Manager view low inventory](./images/manager/bamazon-manager-03.png)
<!-- .element height="50%" width="50%" -->
Manger add inventory
![Manger add inventory](./images/manager/bamazon-manager-05.png)
<!-- .element height="50%" width="50%" -->
Manager add product
![Manager add product](./images/manager/bamazon-manager-06.png)
<!-- .element height="50%" width="50%" -->
Manager view products (with updates)
![Manager view product updates](./images/manager/bamazon-manager-07.png)
<!-- .element height="50%" width="50%" -->
Manager exit
![Manager exit](./images/manager/bamazon-manager-08.png)
<!-- .element height="50%" width="50%" -->