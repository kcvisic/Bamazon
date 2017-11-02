var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "REPLACE_ME",
    port: "REPLACE_ME",

    // Your username
    user: "REPLACE_ME",

    // Your password
    password: "REPLACE_ME",
    database: "REPLACE_ME"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    readProducts();


});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        promptUser();
    });
}



var Produce = function(item_id, stock_quantity) {
    this.item_id = item_id;
    this.stock_quantity = stock_quantity;

}



function promptUser() {

    var promise = inquirer.prompt([{
        name: "item_id",
        message: "Please make your selection by typing an item_id #"
    }, {
        name: "stock_quantity",
        message: "How many?"
    }, ])
    promise.then(function(answer) {
            var usersProduceChoice = new Produce(answer.item_id, answer.stock_quantity);
            console.log(usersProduceChoice)
            usersChoice(usersProduceChoice)
        })
        .catch(function(error) {

        })
}

function usersChoice(choice) {
    console.log("Selecting chosen products...\n");
    connection.query("SELECT * FROM products WHERE ?", {
            item_id: choice.item_id
        },
        function(err, res) {
           


            if (res[0].stock_quantity < choice.stock_quantity) {
                console.log("insufficient Qantity")
                connection.end();
            } else {
                var cost = res[0].price * choice.stock_quantity
                console.log(cost+ " Dollars")
                var updateQuantity = res[0].stock_quantity - choice.stock_quantity;
                updateProduct(updateQuantity, res[0].item_id);
            }
        }

    );

}

function updateProduct(quantity, item_id) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: quantity
            },
            {
                item_id: item_id
            }
        ],
        function(err, res) {
        	
             connection.end();
        }
    )
}
