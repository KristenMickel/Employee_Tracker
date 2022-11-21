

# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://www.gnu.org/licenses/MIT)

## Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Tests](#Tests)
- [Features](#Features)
- [Contribution](#Contribution)
- [Email](#Email)
- [License](#License)

## Description
This assignment focused on developing an interface (better known as a Content Management System or CMS) which allows non-developers to be able to view and interact with information that is stored in a database – in this case, an SQL relational database. Consequently, I was tasked with using Node.js, Inquirer, and MySQL to build an application which could prompt a user for either selections or input, receive the user’s entries, apply those changes to the database, and then display the updated data in a formatted table to the user in the terminal. My employee tracker allows the user to first view the seeded data in my department, role, and employee tables. It then allows the user to add a department, role, or employee to their respective tables. I provide an option for the user to update a role – however, I could not get that function to work correctly. Next, my tracker allows the user to view all of the employees per manager and all of the employees per department. However, it appears that the MySQL GROUP BY statement only returns the first row in the table which matches the query parameters, so that is an issue/bug that I still need to find a work-around for. After that, my tracker allows the user to delete a department, role, or user from their respective tables. And, finally, my tracker allows the user to view the total sum of salaries per department.

## Installation
You will need to have Node.js, Inquirer, and MySQL installed in order to run this program.

## Usage
Simply navigate to the folder where you have stored my files from your terminal, run "npm i", run "node server.js", and then make selections/answer questions from the prompt.

## Tests
I do not have any tests for this program.

## Features
Please see "Description" section above.

## Contribution
If you want to contribute, please contact questions@gmail.com.

## Email
If you have any questions, please contact questions@gmail.com

## Github
My GitHub account name is KristenMickel.

## License
Licensed under the [MIT](https://choosealicense.com/licenses/mit/) license
        