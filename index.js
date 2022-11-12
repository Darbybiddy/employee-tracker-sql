const inquirer = require("inquirer");
require("console.table");
const db = require("./db/connections");

// create a function that has the inquirer prompt object
// in the .then for this function use a switch case
//create function to view all eployees,...
function questions() {
  inquirer
    .prompt({
      type: "list",
      name: "optionList",
      message: "which would you like to do",
      choices: [
        "Add an Employee",
        "view all employees",
        "update employee roles",
        "Add a role",
        "view all roles",
        "add a department",
        "view all department",
        "quit",
      ],
    })

    .then(function (results) {
        switch (results.optionList) {
          case "Add employee":
            addEmployee();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
          case "Add role":
            addRole();
            break;
          case "View roles":
            viewRoles();
            break;
          case "Add department":
            addDepartment();
            break;
          case "View departments":
            viewDepartment();
            break;
            quit();
        }
      });

function addEmployee(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeFirst',
            message: 'please enter the first name of the employee.'
        },
        {
            type: 'input',
            name: 'employeeLast',
            message: 'please enter the last name of the employee.'
        },
        {
            type: 'input',
            name: 'employeeRoleId',
            message: 'please enter the employees role ID number.'
        },
    
        {
            type: 'input',
            name: 'employeeManagerId',
            message: 'please enter the Managers ID number.'
        }
    ]).then(function(answers){})
 }
    function addRole(){}
    function addDepartment(){}  
}
