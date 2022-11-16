const inquirer = require("inquirer");
require("console.table");
const db = require("./db/connections");

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
          updateEmployeeRole();
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
      }
    });

  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "employeeFirst",
          message: "please enter the first name of the employee.",
        },
        {
          type: "input",
          name: "employeeLast",
          message: "please enter the last name of the employee.",
        },
        {
          type: "input",
          name: "employeeRole",
          message: "please enter the employees role.",
        },
        {
          type: "input",
          name: "employeeManager",
          message: "please enter the employees manager.",
        },
      ])
      .then(function (answers) {});
  }

  function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "selectEmployee",
          message:
            "insert what employee and their role you would like to update",
        },
      ])
      .then(function (answers) {});
  }

  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "insert the name of the role.",
        },
        {
          type: "input",
          name: "roleDepartment",
          message: "insert the department that the role belongs to.",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "insert the salary for that departments role.",
        },
      ])
      .then(function (answers) {});
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newDepartmentName",
          message: "insert the name of the new department.",
        },
      ])
      .then(function (answers) {});
  }
}

function viewEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

function viewRoles() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
}
function viewDepartment() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
}
