INSERT INTO department (name)
VALUES 
('kitchen'),
('servers'),
('cleaning');

INSERT INTO role (title, salary, department_id)
VALUES
('manager', '120000', NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jenna', 'Saikaly', NULL, NULL)