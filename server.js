//Need to import 'inquirer' in order to be able to receive input from the terminal.
const inquirer = require('inquirer');
//Need to import 'mysql2' in order to be able to use the Oracle SQL database.
const mysql = require('mysql2');
//Use the console.table() method in order to be able to display database results as a table.
require('console.table');

//This creates the connection to my database.
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

//I am connecting to my database. 
db.connect((err) => {
  //This is my error handling.
  if (err) throw err;
  //This message lets me know that it connected successfully.
  console.log('Connected to the employeeTracker database');
  //This will start the questionPrompt function.
  questionPrompt();
});


//This is the list of options that the prompt will display to the user. 
function questionPrompt() {
  //These are the initial questions posed to the user at each prompt call.
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'Please pick an option',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'view employees by manager', 'view employees by department'],
    },
  ])
  //This switch statement is used to select a different function to execute based on the user's choice selection.
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
      case 'view employees by manager':
        viewEmployeesByManager();
        break;
      case 'view employees by department':
        viewEmployeesByDepartment();
        break;
      default:
        db.end();
    }
  });
}

//This query grabs and displays everything from the department table.
function viewAllDepartments() {
  db.query('SELECT * FROM department;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//This query grabs and displays select data from the role and department tables.
function viewAllRoles() {
  db.query('SELECT r.id AS role_id, r.title, r.salary, d.name AS department_name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//This query grabs and displays select data from the department, role, and employee tables.
function viewAllEmployees() {
  db.query('SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, r.salary, d.name AS department_name, m.last_name AS manager FROM employee AS e INNER JOIN role as r ON e.role_id = r.id INNER JOIN department as d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//This INSERT statement prompts the user to enter the name of the new department they want to add, adds the new department to the department table, and displays the data in a table format.
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

//This INSERT statement prompts the user to enter the title, salary, and department id of the new role they want to add, adds the new role to the role table, and displays the data in a table format.
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
      message: "Enter the department id of the role you would like to add",
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

//This INSERT statement prompts the user to enter the first name, last name, role id, and manager id of the new employee they want to add, adds the new employee to the employee table, and displays the data in a table format.
function addEmployee() {
  inquirer.prompt([
    {
    type: "input",
    message: "Enter the first name of the employee you would like to add",
    name: "newFirstName",
    },
    {
      type: "input",
      message: "Enter the last name of the employee you would like to add",
      name: "newLastName",
    },
    {
      type: "input",
      message: "Enter the role id of the employee you would like to add",
      name: "role_id",
    },
    {
      type: "input",
      message: "Enter the employee id of the manager that you would like the employee to have",
      name: "manager_id",
    },
  ])
  //This is not ideal requiring the user to input the ids of the role and manager.
  .then(results => {
    db.query("INSERT INTO employee SET ?", {first_name:results.newFirstName, last_name:results.newLastName, role_id:results.role_id, manager_id:results.manager_id}, function (err, results) {
      console.table(results);
    viewAllEmployees();
    });
  });
};

//This UPDATE statement updates selected fields in the employee table. But, it is not working correctly. It should update the role_id field in the employee table where an employee's last name is the last_name entered by the user. 
function updateEmployeeRole() {
  inquirer.prompt([
    {
    type: "input",
    message: "Enter the last name of the employee you would like to update",
    name: "last_name",
    },
    {
      type: "input",
      message: "Enter the new role id of the employee you would like to update",
      name: "role_id",
    },
  ])
  //This is not ideal requiring the user to input the id of the role.
  .then(results => {
    db.query("UPDATE employee SET ? WHERE ?", {role_id:results.role_id, last_name:results.last_name}, function (err, results) {
      console.table(results);
    viewAllEmployees();
    });
  });
};

//This query is supposed to grab and display employees grouped by the manager they report to. However, GROUP BY is only returning the name of the first employee listed for a manager in the employee table.
function viewEmployeesByManager() {
  db.query('SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, m.last_name AS manager FROM employee AS e INNER JOIN role as r ON e.role_id = r.id INNER JOIN department as d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id GROUP BY m.last_name;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//This query is supposed to grab and display employees grouped by the department they belong to. However, GROUP BY is only returning the name of the first employee listed for a department in the employee table.
function viewEmployeesByDepartment() {
  db.query('SELECT e.id AS employee_id, e.first_name, e.last_name, d.name AS department_name FROM employee AS e INNER JOIN role as r ON e.role_id = r.id INNER JOIN department as d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id GROUP BY d.name;', function (err, results) {
    console.table(results);
    questionPrompt();
  });
};

//This query grabs salaries by department and sums them together to get a department total.
// function viewAllEmployees() {
//   db.query('SELECT e.id AS employee_id, e.first_name, e.last_name, r.title, r.salary, d.name AS department_name, m.last_name AS manager FROM employee AS e INNER JOIN role as r ON e.role_id = r.id INNER JOIN department as d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id;', function (err, results) {
//     console.table(results);
//     questionPrompt();
//   });
// };
