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
      ],
    })

    .then(function (results) {
      switch (results.optionList) {
        case "Add an Employee":
          addEmployee();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "update employee roles":
          updateEmployeeRole();
          break;
        default:
        case "Add a role":
          addRole();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "add a department":
          addDepartment();
          break;
        case "view all department":
          viewDepartment();
          break;
        case "Quit":
          db.end();
          break;
      }
    });
}
function addEmployee() {
  db.query("SELECT * FROM role", (err, res) => {
    let roles = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    db.query("SELECT * FROM employee", (err, res) => {
      let employees = res.map((manager) => ({
        name: manager.first_name + " " + manager.last_name,
        value: manager.id,
      }));

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
            type: "list",
            name: "employeeRole",
            message: "please enter the employees role.",
            choices: roles,
          },
          {
            type: "list",
            name: "employeeManager",
            message: "please enter the employees manager.",
            choices: employees,
          },
        ])
        .then((answers) => {
          db.query(
            `INSERT INTO employee SET ?`,
            {
              first_name: answers.employeeFirst,
              last_name: answers.employeeLast,
              role_id: answers.employeeRole,
              manager_id: answers.employeeManager,
            },
            (err, res) => {
              if (err) throw err;
              console.log("employee successfully added to database");
              questions();
            }
          );
        });
    });
  });
}

function viewEmployees() {
  const sql = `SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM role", (err, res) => {
    let roles = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    db.query("SELECT * FROM employee", (err, res) => {
      let employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeManager",
            message: "please enter the employees manager.",
            choices: employees,
          },
          {
            type: "list",
            name: "employeeRole",
            message: "please enter the employees role.",
            choices: roles,
          },
        ])
        .then((answers) => {
          db.query(
            `UPDATE employee SET ? WHERE ?`,
            [
              {
                role_id: answers.employeeRole,
              },
              { id: answers.employeeManager },
            ],
            (err, res) => {
              if (err) throw err;
              console.log("employee successfully added to database");
              questions();
            }
          );
        });
    });
  });
}

function addRole() {
  db.query("SELECT * FROM department", (err, res) => {
    let departments = res.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "insert the name of the role.",
        },
        {
          type: "list",
          name: "roleDepartment",
          message: "insert the department that the role belongs to.",
          choices: departments,
        },
        {
          type: "input",
          name: "roleSalary",
          message: "insert the salary for that departments role.",
        },
      ])
      .then((answers) => {
        db.query(
          `INSERT INTO role SET ?`,
          {
            title: answers.roleName,
            salary: answers.roleSalary,
            department_id: answers.roleDepartment,
          },
          (err, res) => {
            if (err) throw err;
            console.log("role successfully added to database");
            questions();
          }
        );
      });
  });
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
    .then((answers) => {
      db.query(
        `INSERT INTO department SET ?`,
        {
          name: answers.newDepartmentName,
        },
        (err, res) => {
          if (err) throw err;
          console.log("department successfully added to database");
          questions();
        }
      );
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
questions();
