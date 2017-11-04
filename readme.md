# Bamazon

## Installation
Clone the repo and install all of the required packages
```bash
git clone git@github.com:kcvisic/Bamazon.git .
cd Bamazon
npm install
```


## Configuration

In order for the application to work, you need to have your `MySQL` settings configured and set. In order to do so, go into the Bamazon directory and create a file called `config.js`. This module should export a single object with the following keys & value pairs set

```json
"host" : "REPLACE",
"port": "REPLACE",
"user": "REPLACE",
"password" : "REPLACE",
"database" : "REPLACE"
```

Below you will find a sample configuration module

```javascript
// config.js
var config = {
	host: "localhost",
  port: "3306",
  user: "billy",
  password: "bob",
  database: "Bamazon"
}
module.exports = config
```

## Running

If you have installed all of the dependencies, and setup your
configuration file, `config.js` accordingly, then you should
be all set. Simply run the following command to start the
application

```bash
node bamazonCustomer.js
```

## Note

I am writing this readme under the assumption that you have created your own Bamazon database. If this is not the case, feel free to use the `install_db.sql` script to automatically create the database and populate it with some sample data that I created.

In order to run the script, type the following command

```bash
mysql -u [username] -p < db/install_db.sql
```

If you make some changes, and you want to restore the sample database to its original state, simply run the following command

```bash
mysql -u [username] -p < db/reset_db.sql
```
