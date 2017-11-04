var mysql = require("mysql");
var inquirer = require("inquirer");
var config = require("./config.js")
var connection = mysql.createConnection(config);

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

var Produce = function(item_id, requested_amount) {
  this.item_id = item_id;
  this.requested_amount = requested_amount;

}

function promptUser() {

  var promise = inquirer.prompt([{
    name: "item_id",
    message: "Please make your selection by typing an item_id #"
  }, {
    name: "requested_amount",
    message: "How many?"
  }, ])
  promise.then(function(answer) {
      var usersProduceChoice = new Produce(answer.item_id, answer.requested_amount);
      console.log(`User requested: ${JSON.stringify(usersProduceChoice)}`)
      usersChoice(usersProduceChoice)
    })
    .catch(function(error) {

    })
}

function usersChoice(choice) {
  console.log("Selecting chosen products...");
  connection.query("SELECT * FROM products WHERE ?", {
      item_id: choice.item_id
    },
    function(err, res) {
      if (res[0].stock_quantity < choice.requested_amount) {
        console.log("insufficient Quantity")
        connection.end();
      } else {
        var cost = res[0].price * choice.requested_amount
        console.log(cost + " Dollars")
        var updateQuantity = res[0].stock_quantity - choice.requested_amount;
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
