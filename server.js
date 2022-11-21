//Previously, we were saving data in JSON files, but now we will be saving data in the database.
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

//Here, I am creating the connection to my database.
const db = mysql.createConnection(
  {
    //I am going to run this on my local machine.
    host: 'localhost',
    //Need my mysql username.
    user: 'root',
    //Need my mysql password.
    password: 'UnitTest2022*!',
    //Need my database name in order for my program to know which database to connect to.
    database: 'employeeTracker_db',
  }
);

db.connect((err) => {
  if (err) throw err;
  //This message lets me know that it connected successfully.
  console.log('Connected to the employeeTracker database');
  questionPrompt();
});


//This is the list of options that the prompt will display to the user. 
function questionPrompt() {
  //Initial questions
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'Please pick an option',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    },
  ])
  //Switch statement used to select a different function to execute based on the user's choice selection.
  .then((selection) => {
    console.log(selection.choices);
    switch (selection.choices) {
      case 'view all departments':
        viewAllDepartments();
        break;
      case 'view all roles':
        viewAllRoles();
        break;
      case 'view all employees':
        viewAllEmployees();
        break;
      case 'add a department':
        addDepartment();
        break;
      case 'add a role':
        addRole();
        break;
      case 'add an employee':
        addEmployee();
        break;
      case 'update an employee role':
        updateEmployeeRole();
        break;
      default:
        db.end();
    }
  });
}

//This query grabs everything from the department table.
function viewAllDepartments() {
  db.query('SELECT * FROM department;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//This query grabs select data from the role and department tables.
function viewAllRoles() {
  db.query('SELECT r.id AS role_id, r.title, r.salary, d.name AS department_name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//This query grabs select data from the department, role, and employee tables.
function viewAllEmployees() {
  db.query('SELECT e.id as employee_id, e.first_name, e.last_name, r.title, r.salary, d.name AS department_name, m.last_name AS manager FROM employee AS e INNER JOIN role as r ON e.role_id = r.id INNER JOIN department as d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//Add a department
function addDepartment() {
  inquirer.prompt([
    {
    type: "input",
    message: "Enter the name of the department you would like to add",
    name: "dept",
    },
  ])
  .then(results => {
    const { dept } = results;
    db.query("INSERT INTO department SET ?", {name: dept}, function (err, results) {
      console.table(results);
    viewAllDepartments();
    });
  });
};

//Add a role
function addRole() {
  inquirer.prompt([
    {
    type: "input",
    message: "Enter the title of the role you would like to add",
    name: "newTitle",
    },
    {
      type: "input",
      message: "Enter the salary of the role you would like to add",
      name: "newSalary",
    },
    {
      type: "input",
      message: "Enter the department of the role you would like to add",
      name: "department_id",
    },
  ])
  //This is not ideal requiring the user to input the id of the department.
  .then(results => {
    db.query("INSERT INTO role SET ?", {title:results.newTitle, salary:results.newSalary, department_id:results.department_id}, function (err, results) {
      console.table(results);
    viewAllRoles();
    });
  });
};

//Add an employee

//Update an employee role
