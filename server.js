//Previously, we were saving data in JSON files, but now we will be saving data in the database.
//
const fs = require('fs');
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
    database: ''
  },
  //This message lets me know that it connected successfully.
  console.log('Connected to the employeeTracker database.')
);

//This is the list of options that the prompt will display to the user. 
const initialQuestion = [
  {
    type: 'list',
    name: 'choices',
    message: 'Please pick an option',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    //Need a filter function so that when the user selects an option, it will filter for that choice and return the value.
    filter(val) {
      return val.toLowerCase();
    }
  }
]

//Once the user selects an option, this function will run the appropriate query in the database.
function runDbQuery() {
  return inquirer.prompt(initialQuestion)
  .then((selection) => {
    if(selection === 'view all departments') {
      //Provide the query you want to run and then a function.
      db.query('SELECT * FROM department;', function (err, results) {
        console.table(results);
      });
    } else if (selection === 'view all roles') {
        db.query('SELECT * FROM role;', function (err, results) {
          console.table(results);
        });
    } else if (selection === 'view all employees') {
        db.query('SELECT * FROM employee;', function (err, results) {
          console.table(results);
        });
    } else if (selection === 'add a department') {
      //Add other selection options
    } else if (selection === 'add a role') {
      //Add other selection options
    } else if (selection === 'add as employee') {
      //Add other selection options
    } else if (selection === 'add an employee role'){
      //Add other selection options
    } else {
      //"No selection was made"
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

runDbQuery();