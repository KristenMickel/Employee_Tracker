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

//This query grabs everything from the department table
function viewAllDepartments() {
  db.query('SELECT * FROM department;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//this query grabs everything from the role table
function viewAllRoles() {
  db.query('SELECT * FROM role;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//This query grabs everything from the employees table
function viewAllEmployees() {
  db.query('SELECT * FROM employee;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//Add a department

//Add a role

//Add an employee

//Update an employee role
