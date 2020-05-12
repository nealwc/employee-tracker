const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "workforceDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to workforceDB!");
    runWorkforce();
});

// main interface
function runWorkforce() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update Employee Roles",
                "EXIT"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "View All Employees":
                    viewEmployees();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "Add a Role":
                    addRole();
                    break;

                case "Add an Employee":
                    addEmployee();
                    break;

                case "Update Employee Roles":
                    updateEmployee();
                    break;

                case "EXIT":
                    connection.end();
            }
        });
};

// function to add a role
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
                message: "What's the ID of the department?"
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
                    runWorkforce();
                });
        });
};

// function to add a department
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
                    runWorkforce();
                });
        });
};

// function to add an employee
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
                message: "What's the role ID for the new employee?"
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
                message: "What's the employee ID of the manager?",
                when: function (answer) {
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
                    runWorkforce();
                });
        });
};

// function to view all departments
function viewDepartments() {
    let query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runWorkforce();
    });
};


// function to view all rolse
function viewRoles() {
    let query = "SELECT * FROM role"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runWorkforce();
    });
};


// function to view all employees
function viewEmployees() {
    let query = "SELECT * FROM employee"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runWorkforce();
    });
};

// functin to update employee roles
function updateEmployee() {
    inquirer
        .prompt([
            {
                name: "employeeID",
                type: "number",
                message: "What's the ID of the employee you'd like to update?"
            },
            {
                name: "roleID",
                type: "number",
                message: "What's the ID of the new role?"
            }
        ]).then(function (answer) {
            var query = connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: answer.roleID
                    },
                    {
                        id: answer.employeeID
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log("The employee's new role ID has been updated!");
                    runWorkforce();
                }
            );
        })
};