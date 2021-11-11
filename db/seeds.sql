use business_db;

INSERT INTO departments (dept_name)
VALUES ("Engineering");
INSERT INTO departments (dept_name)
VALUES ("Finance");
INSERT INTO departments (dept_name)
VALUES ("Legal");
INSERT INTO departments (dept_name)
VALUES ("Sales");

INSERT INTO roles (title, dept_id, salary)
VALUES ("Sales Lead", 4, 100000.00);
INSERT INTO roles (title, dept_id, salary)
VALUES ("Salesperson", 4, 80000.00);
INSERT INTO roles (title, dept_id, salary)
VALUES ("Lead Engineer", 1, 150000.00);
INSERT INTO roles (title, dept_id, salary)
VALUES ("Software Engineer", 1, 120000.00);
INSERT INTO roles (title, dept_id, salary)
VALUES ("Account Manager", 2, 160000.00);
INSERT INTO roles (title, dept_id, salary)
VALUES ("Accountant", 2, 125000.00);
INSERT INTO roles (title, dept_id, salary)
VALUES ("Legal Team Lead", 3, 250000.00);
INSERT INTO roles (title, dept_id, salary)
VALUES ("Lawyer", 3, 190000.00);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Phil", "Ken Sebben", 5);
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Judy", "Ken Sebben", 6);
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Harvey", "Birdman", 8);
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Myron", "Reducto", 8);
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Mentok", "the Mindtaker", 7);
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("X", "the Eliminator", 8);
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Peter", "Potamus", 2);