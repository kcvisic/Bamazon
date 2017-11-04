
CREATE DATABASE `Bamazon`;

USE `Bamazon`;


CREATE TABLE products (item_id INT NOT NULL AUTO_INCREMENT,
                                            product_name VARCHAR(100) NULL,
                                                                      department_name VARCHAR(100) NULL,
                                                                                                   price DECIMAL(10,2) NULL,
                                                                                                                       stock_quantity INT(50) NOT NULL,
                                                                                                                                              PRIMARY KEY (item_id));


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bread",
        "Bakery",
        5.50,
        15), ("Turkey",
              "Deli",
              6,
              20), ("Ribeye",
                    "Meats",
                    10.50,
                    5), ("Shrimp",
                         "Seafood",
                         21.30,
                         10), ("Chedder",
                               "Produce",
                               3.50,
                               13), ("Ketchup",
                                     "Condiments",
                                     5,
                                     25), ("Blueberries",
                                           "Fruits",
                                           6,
                                           20), ("Celerry",
                                                 "Veggies",
                                                 2.30,
                                                 8), ("Peas",
                                                      "Frozen foods",
                                                      4,
                                                      5), ("Beer",
                                                           "Beverages",
                                                           8,
                                                           25);
