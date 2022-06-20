INSERT INTO departments (name)
VALUES 
('Marketing'),
('IT'),
('Finance'),
('Administrative');

INSERT INTO roles (title, salary, department_id)
VALUES
('Marketing Manager', '120000', 1),
('Computer Engineer', '120000', 2),
('Accountant', '100000', 3),
('Administrator', '100000', 4),
('Intern', '80000', NULL);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jenna', 'Saikaly', 2, NULL),
('Mark', 'MacDonald', 5, 1),
('Sarah', 'Turner', 3, 1),
('Mike', 'Myers', 4, 2),
('Lauren', 'French', 2, 1),
('Jordan', 'Cardinal', 3, 2),
('Ryan', 'Boisseau', 1, 1);