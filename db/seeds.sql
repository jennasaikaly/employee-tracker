INSERT INTO departments (name)
VALUES 
('Front-End'),
('Back-End'),
('Human Resources'),
('Administration');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', '120000', NULL),
('Engineer', '100000', NULL),
('Intern', '80000', NULL);



INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jenna', 'Saikaly', NULL, NULL),
('Ryan', 'Boisseau', NULL, NULL);