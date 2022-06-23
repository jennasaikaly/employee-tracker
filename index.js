const connection = require('./config/connection');
const inquirer = require("inquirer");
require('console.table');


//menu prompts
function menuPrompt() {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "menu",
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "Update employee managers",
                    "View employees by manager",
                    "View employees by department",
                    "View total utilized budget of a department",
                    "Delete department",
                    "Delete role",
                    "Delete employee",
                    "EXIT"
                ]
            }
        ])
        .then(response => {
            switch (response.menu) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addNewDepartment();
                    break;
                case "Add a role":
                    addNewRole();
                    break;
                case "Add an employee":
                    addNewEmployee();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "Update employee managers":
                    updateEmployeeManager();
                    break;
                case "View employees by manager":
                    viewEmployeesByManager();
                    break;
                case "View employees by department":
                    viewEmployeesByDepartment();
                    break;
                case "View total utilized budget of a department":
                    viewDepartmentBudget();
                    break;
                case "Delete department":
                    deleteDepartment();
                    break;
                case "Delete role":
                    deleteRole();
                    break;
                case "Delete employee":
                    deleteEmployee();
                    break;
                case "EXIT":
                    console.log("Thank you for using Employee Tracker");
                    break;
            }
        })
}

//view all departments 
function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.log('You are now viewing Departments')
        console.table(response)
        menuPrompt();
    })
};

//View all Roles
function viewRoles() {
    const sql = `SELECT roles.id, roles.title,roles.salary, departments.name 
                 AS department_name
                 FROM roles
                 LEFT JOIN departments 
                 ON roles.department_id = departments.id`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.log('You are now viewing Roles')
        console.table(response)
        menuPrompt();
    })
};

//view all Employees
function viewEmployees() {
    const sql = `
    SELECT 
        employees.id AS employee_id, 
        employees.first_name, 
        employees.last_name, 
        roles.salary, 
        roles.title AS job_title, 
        departments.name AS department_name,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id
    `;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.log('You are now viewing Employees')
        console.table(response)
        menuPrompt();
    });

};

//add a department
function addNewDepartment() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What is the department name?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter a Department name.");
                        return false;
                    }
                }
            }
        ])
        .then(function (response) {
            const sql = `INSERT INTO departments(name)
            VALUES (?);`;
            const params = response.newDepartment;
            connection.query(sql, params, (err, response) => {
                if (err) throw err;
                console.log(response.newDepartment + " has been added to the 'Departments' Table.");
                menuPrompt();
            });

        });
}

//add a role 
function addNewRole() {
    const sql = `SELECT * FROM departments`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let departmentChoices = response.map((department) => {
            return {
                value: department.id,
                name: department.name
            }
        })
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "roleTitle",
                    message: "What is the name of the Role?",
                    validate: roleTitleInput => {
                        if (roleTitleInput) {
                            return true;
                        } else {
                            console.log("Please enter a role.");
                            return false;
                        }
                    }
                },
                {
                    type: "input",
                    name: "roleSalary",
                    message: "What is the role's salary (ex: 100000, 80000)",
                    validate: roleSalaryInput => {
                        if (roleSalaryInput) {
                            return true;
                        } else {
                            console.log("Please enter an amount");
                            return false;
                        }
                    }
                },
                {
                    type: "list",
                    name: "roleDepartment",
                    message: "What is the department for this role?",
                    choices:
                        departmentChoices
                }
            ])
            .then(function (response) {
                const sql = `INSERT INTO roles (title, salary, department_id)
            VALUES (?, ?, ?);`;
                const params = [response.roleTitle, response.roleSalary, response.roleDepartment];
                connection.query(sql, params, (err, response) => {
                    if (err) throw err;
                    console.log(response.roleTitle + " has been added to the 'Roles' Table.");
                    menuPrompt();
                });

            });
    })
}

//add an Employee
function addNewEmployee() {
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let managerChoices = response.map((manager) => {
            return {
                value: manager.id,
                name: manager.first_name + " " + manager.last_name
            }
        })
        managerChoices.push({
            value: null,
            name: "No Manager"
        })
        const sql = `SELECT * FROM roles`;
        connection.query(sql, (err, response) => {
            if (err) throw err;
            let roleChoices = response.map((role) => {
                return {
                    value: role.id,
                    name: role.title
                }
            })
            return inquirer
                .prompt([
                    {
                        type: "input",
                        name: "firstname",
                        message: "What is the employee's first name?",
                        validate: firstnameInput => {
                            if (firstnameInput) {
                                return true;
                            } else {
                                console.log("Please enter a first name.");
                                return false;
                            }
                        }
                    },
                    {
                        type: "input",
                        name: "lastname",
                        message: "What is the employee's last name?",
                        validate: lastnameInput => {
                            if (lastnameInput) {
                                return true;
                            } else {
                                console.log("Please enter a last name");
                                return false;
                            }
                        }
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "What is the Employee's role?",
                        choices: roleChoices
                    },
                    {
                        type: "list",
                        name: "manager",
                        message: "Who is the Employee's manager?",
                        choices: managerChoices
                    }
                ])
                .then(function (response) {
                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`;
                    const params = [response.firstname, response.lastname, response.role, response.manager];
                    connection.query(sql, params, (err, response) => {
                        if (err) throw err;
                        console.log(response.firstname + " " + response.lastname + " has been added to the 'Employees' Table.");
                        menuPrompt();
                    });
                })
        })
    });
}

//update Employee Role
function updateEmployeeRole() {
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let employeeChoices = response.map((employee) => {
            return {
                value: employee.id,
                name: employee.first_name + " " + employee.last_name
            }
        })
        const sql = `SELECT * FROM roles`;
        connection.query(sql, (err, response) => {
            if (err) throw err;
            let roleChoices = response.map((role) => {
                return {
                    value: role.id,
                    name: role.title
                }
            })
            return inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Which employee would you like to reassign?",
                        choices: employeeChoices
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Which role would you like to reassign them to?",
                        choices: roleChoices
                    }
                ])
                .then(function (response) {
                    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                    const params = [response.role, response.employee];
                    connection.query(sql, params, (err) => {
                        if (err) throw err;
                        console.log("Role has been updated.");
                        menuPrompt();
                    });
                })
        })
    });
}

//update Employee Managers
function updateEmployeeManager() {
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let employeeChoices = response.map((employee) => {
            return {
                value: employee.id,
                name: employee.first_name + " " + employee.last_name
            }
        })
        const sql = `SELECT * FROM employees`;
        connection.query(sql, (err, response) => {
            if (err) throw err;
            let managerChoices = response.map((manager) => {
                return {
                    value: manager.id,
                    name: manager.first_name + " " + manager.last_name
                }
            })
            managerChoices.push({
                value: null,
                name: "No Manager"
            })
            return inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "For which employee would you like to update managers?",
                        choices: employeeChoices
                    },
                    {
                        type: "list",
                        name: "manager",
                        message: "Who is their new Manager?",
                        choices: managerChoices
                    }
                ])
                .then(function (response) {
                    const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
                    const params = [response.manager, response.employee];
                    connection.query(sql, params, (err) => {
                        if (err) throw err;
                        console.log("Manager has been updated.");
                        menuPrompt();
                    });
                })
        })
    });
}

// //view all Employees By Manager
function viewEmployeesByManager() {
    const sql =  `
    SELECT DISTINCT
        employees.manager_id,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id
    `;
    connection.query(sql, (err, response) => {
        if (err) throw err;
                let managerChoices = response.map((manager) => {
            return {
                value: manager.manager_id,
                name: manager.manager_name
            }
        })
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "manager",
                    message: "For which Manager would you like to see an Employee List?",
                    choices: managerChoices
                },
            ])
            .then(function (response) {
                const sql = `
                SELECT 
                    employees.id AS employee_id, 
                    employees.first_name, 
                    employees.last_name, 
                    roles.salary, 
                    roles.title AS job_title, 
                    departments.name AS department_name,
                    employees.manager_id,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees manager ON manager.id = employees.manager_id
                WHERE employees.manager_id = ?
                `
                const params = [response.manager];
                console.log(response.manager);
                connection.query(sql, params, (err, response) => {
                    if (err) throw err;
                    console.log("You are now viewing the Employee List");
                    console.table(response);
                    menuPrompt();
                });
            })
    })
}
//view Employees By Department
function viewEmployeesByDepartment() {
    const sql = `SELECT * FROM departments`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let departmentChoices = response.map((department) => {
            return {
                value: department.id,
                name: department.name
            }
        })
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "department",
                    message: "For which Department would you like to see an Employee List?",
                    choices: departmentChoices
                },
            ])
            .then(function (response) {
                const sql = `
                SELECT 
                    employees.id AS employee_id, 
                    employees.first_name, 
                    employees.last_name, 
                    roles.salary, 
                    roles.title AS job_title, 
                    departments.name AS department_name,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees manager ON manager.id = employees.manager_id
                WHERE employees.role_id = ?
                `
                const params = [response.department];
                connection.query(sql, params, (err, response) => {
                    if (err) throw err;
                    console.log("You are now viewing the Employee List");
                    console.table(response);
                    menuPrompt();
                });
            })
    })
}

//delete Department
function deleteDepartment() {
    const sql = `SELECT * FROM departments`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let departmentChoices = response.map((department) => {
            return {
                value: department.id,
                name: department.name
            }
        })
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Which department would you like to delete?",
                    choices: departmentChoices
                }
            ])
            .then(function (response) {
                const sql = `DELETE FROM departments WHERE id = ?`;
                const params = [response.department];
                connection.query(sql, params, (err, response) => {
                    if (err) throw err;
                    console.log("This department has been deleted from the 'Departments' table.");
                    menuPrompt();
                });
            });
    })
}
// // delete Role
function deleteRole() {
    const sql = `SELECT * FROM roles`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let roleChoices = response.map((role) => {
            return {
                value: role.id,
                name: role.title
            }
        })
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "role",
                    message: "Which role would you like to delete?",
                    choices: roleChoices
                }
            ])
            .then(function (response) {
                console.log(response);
                const sql = `DELETE FROM roles WHERE id = ?`;
                const params = [response.role];
                connection.query(sql, params, (err, response) => {
                    if (err) throw err;
                    console.log("This role has been deleted from the 'Roles' table.");
                    menuPrompt();
                });
            });
    })
}
// delete Employee
function deleteEmployee() {
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let employeeChoices = response.map((employee) => {
            return {
                value: employee.id,
                name: employee.first_name + " " + employee.last_name
            }
        })
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which Employee would you like to delete?",
                    choices: employeeChoices
                }
            ])
            .then(function (response) {
                const sql = `DELETE FROM employees WHERE id = ?`;
                const params = [response.employee];
                connection.query(sql, params, (err, response) => {
                    if (err) throw err;
                    console.log("This Employee has been deleted from the 'Employees' table.");
                    menuPrompt();
                });
            });
    })
}


//view Department Budget
function viewDepartmentBudget() {
    const sql = `SELECT * FROM departments`;
    connection.query(sql, (err, response) => {
        if (err) throw err;
        let departmentChoices = response.map((department) => {
            return {
                value: department.id,
                name: department.name
            }
        })
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "department",
                    message: "For which Department would you like to view the total Utilized Budget?",
                    choices: departmentChoices
                },
            ])
            .then(function (response) {
                const sql = `
                SELECT 
                SUM(salary) AS "Total Utilized Budget"                
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees manager ON manager.id = employees.manager_id
                WHERE employees.role_id = ?
                `
                const params = [response.department];
                connection.query(sql, params, (err, response) => {
                    if (err) throw err;
                    console.log("You are now viewing the Total Utilized Budget for the this Department");
                    console.table(response);
                    menuPrompt();
                });
            })
    })
}


menuPrompt();