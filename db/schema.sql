DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  dept_id INT,
  salary DECIMAL,
  CONSTRAINT fk_departments FOREIGN KEY (dept_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  dept_id INT,
  CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (dept_id) REFERENCES roles(dept_id)
);