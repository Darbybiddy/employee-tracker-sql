USE employee_tracker_db;

INSERT INTO department(id, name)
VALUES 
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Finance'),
(4, 'Human Resources');

INSERT INTO role(id, title, salary, department_id)
VALUES 
(1, 'Sales Rep', 50.000, 1),
(2, 'Sales Lead',60.000, 1),
(3, 'Desginer', 60.000, 2),
(4, 'videographer',70.000, 2),
(5, 'Accountant', 70.000, 3),
(6, 'Accountant Manager',80.000, 3),
(7, 'Recruiter', 70.000, 4),
(8, 'Payroll',50.000, 4);


INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'Sarah','Johnson',2, NULL),
(2, 'Jerry','Smith', 1, 1),
(3, 'Levi','Whatts',4, NULL),
(4, 'Jess','Miller',3, 3),
(5, 'Sam', 'Willson', 6, NULL),
(6, 'John','Anderson', 5,5),
(7, 'Diane','Taylor', 7, NULL),
(8, 'Steve','Williams', 8,NULL);