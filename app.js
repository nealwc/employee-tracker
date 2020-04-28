var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "workforceDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
    addDepartment();
    // connection.end();
});

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the name of the department you'd like to add?"
            }
        ])
        .then(function(answer) {
            let query = "INSERT INTO department SET ?"
            connection.query(query, 
                {
                    name: answer.department
                },
                function(err) {
                    if (err) throw err;
                    console.log("The new department was added!");
        });
    });
};