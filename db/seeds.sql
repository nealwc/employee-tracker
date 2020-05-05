USE workforceDB;

/* departments */
INSERT INTO department (name) 
VALUES ("Sales"), ("Accounting"), ("Management"), ("Human Resources");

/* roles */
INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Accountant", 45000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant ", 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Accountant ", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Branch Manager", 100000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Generalist", 45000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Manager", 65000, 4);

/* employees */
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Dwight", "Schrute", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jim", "Halpert", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Phyllis", "Vance", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kevin", "Malone", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Angela", "Martin", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Oscar", "Martinez", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Scott", 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Toby", "Flenderson", 7);