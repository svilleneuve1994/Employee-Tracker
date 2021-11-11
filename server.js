const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');
require('console.table');

const connection = mysql.createConnection(
	{
  host: 'localhost',
	port: 3306,
  user: 'root',
	password: '1rk3n3mp1r3',
  database: 'business_db'
	},
	console.log(`Connected to the business_db database.`)
);

connection.connect(function (err) {
	if (err) throw err;
	console.log(`
█████████████████████████████████████████████████████████████████████████████████████████████████████
█─▄▄▄▄█▄─▄▄─█▄─▄─▀█▄─▄─▀█▄─▄▄─█▄─▀█▄─▄████▀▄─██▄─▀█▄─▄█▄─▄▄▀███─▄▄▄▄█▄─▄▄─█▄─▄─▀█▄─▄─▀█▄─▄▄─█▄─▀█▄─▄█
█▄▄▄▄─██─▄█▀██─▄─▀██─▄─▀██─▄█▀██─█▄▀─█████─▀─███─█▄▀─███─██─███▄▄▄▄─██─▄█▀██─▄─▀██─▄─▀██─▄█▀██─█▄▀─██
▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▄▀▀▄▄▀▀▀▄▄▀▄▄▀▄▄▄▀▀▄▄▀▄▄▄▄▀▀▀▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▄▀▀▄▄▀
██████████████████████████████████████████████████████████████████████████████████████████████
█▄─▄▄─█▄─▀█▀─▄█▄─▄▄─█▄─▄███─▄▄─█▄─█─▄█▄─▄▄─█▄─▄▄─███─▄─▄─█▄─▄▄▀██▀▄─██─▄▄▄─█▄─█─▄█▄─▄▄─█▄─▄▄▀█
██─▄█▀██─█▄█─███─▄▄▄██─██▀█─██─██▄─▄███─▄█▀██─▄█▀█████─████─▄─▄██─▀─██─███▀██─▄▀███─▄█▀██─▄─▄█
▀▄▄▄▄▄▀▄▄▄▀▄▄▄▀▄▄▄▀▀▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▀▀▄▄▄▄▄▀▄▄▄▄▄▀▀▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▀▄▄▀
	`)
	mainMenu();
});

function viewEmployees() {
	let query = `SELECT employees.id, employees.first_name AS 'first name', employees.last_name AS 'last name', roles.title, departments.dept_name AS 'department', roles.salary
	FROM employees, roles, departments
	WHERE departments.id = roles.dept_id
	AND roles.id = employees.role_id
	ORDER BY employees.id ASC`
	connection.query(query,
		function(err, result) {
			if (err) throw err;
			console.table(result);
			mainMenu();
		});
}

function viewRoles() {
	let query = `SELECT roles.id, roles.title, departments.dept_name AS 'department', roles.salary
	FROM roles JOIN departments ON roles.dept_id=departments.id
	ORDER BY roles.id ASC`
	connection.query(query,
		function(err, result) {
			if (err) throw err;
			console.table(result);
			mainMenu();
		});
}

function viewDepts() {
	let query = `SELECT departments.id, departments.dept_name AS 'department' FROM departments ORDER BY departments.id ASC`
	connection.query(query,
		function(err, result) {
			if (err) throw err;
			console.table(result);
			mainMenu();
		}
	);
}

function addEmployee() {
  inquirer.prompt([
		{
			type: 'input',
			message: 'What is the employees first name?',
			name: 'employeeFname',
		},
		{
			type: 'input',
			message: 'What is the employees last name?',
			name: 'employeeLname',
		}
	])
	.then ((data) => {
		let newFirstname = `${data.employeeFname}`;
		let newLastname = `${data.employeeLname}`;
		const roleList = `SELECT roles.id, roles.title FROM roles`;

		connection.query(roleList,
			function(err, result) {
				if (err) throw err;
				const roles = result.map(({id, title}) => ({name: title, value: id}));

				inquirer.prompt([
					{
						type: 'list',
						message: 'What is the employees role?',
						name: 'employeeRole',
						choices:	roles
					}
				])
				.then((chosenRole) => {
					const role = `${chosenRole.employeeRole}`;
					const query = `INSERT INTO employees (first_name, last_name, role_id)
					VALUES ("${newFirstname}", "${newLastname}", ${role})`;

					connection.query(query, (err) => {
						if (err) throw err;
						console.log("Welcome, new employee " + newFirstname + " " + newLastname + "!");
						mainMenu();
					})
				})
			});
	})
}

function addRole() {
  inquirer.prompt([
		{
			type: 'input',
			message: 'What is the name of the role?',
			name: 'addRole',
		},
		{
			type: 'input',
			message: 'What is the salary of the role?',
			name: 'addSalary',
		},
	])
	.then ((data) => {
		let roleName = `${data.addRole}`;
		let salary = `${data.addSalary}`;
		const deptList = `SELECT departments.id, departments.dept_name FROM departments`;

		connection.query(deptList,
			function(err, result) {
				if (err) throw err;
				const depts = result.map(({id, dept_name}) => ({name: dept_name, value: id}));

				inquirer.prompt([
					{
						type: 'list',
						message: 'Which department does the role belong to?',
						name: 'insertDept',
						choices:	depts
					}
				])
				.then((chosenDept) => {
					const dept = `${chosenDept.insertDept}`;
					const query = `INSERT INTO roles (title, dept_id, salary)
					VALUES ("${roleName}", ${dept}, ${salary})`;
					connection.query(query, (err) => {
						if (err) throw err;
						console.log("New role added!");
						mainMenu();
					})
				})
			});
	});
}

function addDept() {
  inquirer.prompt([
		{
			type: 'input',
			message: 'What is the name of the department?',
			name: 'addDept'
		}
	])
	.then((chosenDept) => {
		let dept = `${chosenDept.addDept}`;
		const query = `INSERT INTO departments (dept_name)
		VALUES ("${dept}")`;
		connection.query(query, (err) => {
			if (err) throw err;
			console.log("New department added!");
			mainMenu();
		})
	});
}

function updateRole() {
	const employeeList = `SELECT employees.id, employees.first_name, employees.last_name, employees.role_id FROM employees`;

	connection.query(employeeList, (err, result) => {
		if (err) throw err;
		const employees = result.map( ({id, first_name, last_name}) => ({name: `${first_name} ${last_name}`, value: id}) );
		const roleList = `SELECT roles.id, roles.title FROM roles`;

		connection.query(roleList, (err, result) => {
			if (err) throw err;
			const roles = result.map(({id, title}) => ({name: title, value: id}));

			inquirer.prompt([
				{
					type: 'list',
					message: 'Which employee is changing roles?',
					name: 'chooseEmployee',
					choices:	employees
				}, {
					type: 'list',
					message: 'Which role do you want to assign to the employee?',
					name: 'updateRole',
					choices: roles
				}
			])
			.then((data) => {
				let chosenEmployee = `${data.chooseEmployee}`;
				let chosenRole = `${data.updateRole}`;
				let query = `UPDATE employees SET employees.role_id = ${chosenRole} where employees.id = ${chosenEmployee}`;
				
				connection.query(query, (err) => {
					if (err) throw err;
					console.log("Employee role updated!");
					mainMenu();
				})
			})
		})
	})
}

function mainMenu() {
  inquirer.prompt([
		{
			type: 'list',
			message: 'What would you like to do?',
			name: 'menu',
			choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
		}
	])
	.then((data) => {
		let task = `${data.menu}`;
		switch(task) {
			case 'View All Employees':
				viewEmployees();
				break;
			case 'Add Employee':
				addEmployee();
				break;
			case 'Update Employee Role':
				updateRole();
				break;
			case 'View All Roles':
				viewRoles();
				break;
			case 'Add Role':
				addRole();
				break;
			case 'View All Departments':
				viewDepts();
				break;
			case 'Add Department':
				addDept();
				break;
			case 'Quit':
				connection.end();
				break;
		}
	})
}
