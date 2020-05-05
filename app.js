const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "workforceDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to workforceDB!");
    // addDepartment();
    // addRole();
    // addEmployee();
    // viewDepartments();
    // viewRoles();
    viewEmployees();
    // connection.end();
});

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role you'd like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of this new role?"
            },
            {
                name: "department",
                type: "input",
                message: "What's the number of the department "
            }
        ])
        .then(function (answer) {
            let query = "INSERT INTO role SET ?"
            connection.query(query,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("The new role was added!");
                });
        });
};

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the name of the department you'd like to add?"
            }
        ])
        .then(function (answer) {
            let query = "INSERT INTO department SET ?"
            connection.query(query,
                {
                    name: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("The new department was added!");
                });
        });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first",
                type: "input",
                message: "What is the first name of the new employee?"
            },
            {
                name: "last",
                type: "input",
                message: "What is the last name of the new employee?"
            },
            {
                name: "role",
                type: "input",
                message: "What role does the new employee have?"
            },
            {
                name: "confirmManager",
                type: "list",
                message: "Does the employee have a manager?",
                choices: ["Yes", "No"]
            },
            {
                name: "manager",
                type: "input",
                message: "What's the name of the manager?",
                when: function(answer) {
                    return answer.confirmManager === "Yes";
                }
            }
        ])
        .then(function (answer) {
            let query = "INSERT INTO employee SET ?"
            connection.query(query,
                {
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: answer.role,
                    manager_id: answer.manager
                },
                function (err) {
                    if (err) throw err;
                    console.log("The new role was added!");
                });
        });
};

function viewDepartments() {
    inquirer
        .prompt([
            {
                name: "departments",
                type: "list",
                message: "Do you want to view the departments?",
                choices: ["Yes", "No"]
            }
        ])
        .then(function (answer) {
            let query = "SELECT * FROM department"
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
            });
        });
};

function viewRoles() {
    inquirer
        .prompt([
            {
                name: "roles",
                type: "list",
                message: "Do you want to view the roles?",
                choices: ["Yes", "No"]
            }
        ])
        .then(function (answer) {
            let query = "SELECT * FROM role"
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
            });
        });
};

function viewEmployees() {
    inquirer
        .prompt([
            {
                name: "employees",
                type: "list",
                message: "Do you want to view the employees?",
                choices: ["Yes", "No"]
            }
        ])
        .then(function (answer) {
            let query = "SELECT * FROM employee"
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.table(res);
            });
        });
};
