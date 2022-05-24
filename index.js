const connection = require('./config/connection');
const inquirer = require("inquirer");
//const { addDepartment, addEmployee, addRole, readDepartments, readRoles, readEmployees } = require("./db/queries");

const cTable = require('console.table');
//const db = require("./db/queries");




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
                    "Delete department",
                    "Delete role",
                    "Delete employee",
                    "View total utilized budget of a department",
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
                // case "Update employee managers":
                //     updateEmployeeManager();
                //     break;
                // case "View employees by manager":
                //     break;
                // case "View employees by department":
                //     break;
                // case "Delete department":
                //     deleteDepartment();
                //     break;
                // case "Delete role":
                //     deleteRole();
                //     break;
                // case "Delete employee":
                //     deleteEmployee();
                //     break;
                // case "View total utilized budget of a department":
                //     break;
                case "EXIT":
                    console.log("Thank you for using Employee Tracker");
                    break;
            }
        })
}

//view all departments 
function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log('You are now viewing Departments')
        console.table(results)
    })
    menuPrompt();
};
//View all Roles
function viewRoles() {
    const sql = `SELECT * FROM roles`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log('You are now viewing Roles')
        console.table(results)
    })
    menuPrompt();
};
//view all Employees
function viewEmployees() {
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log('You are now viewing Employees')
        console.table(results)
    })
    menuPrompt();
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
            const sql = `INSERT INTO departments(department_name)
            VALUES (?);`;
            const params = response.newDepartment;
            connection.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log(response.newDepartment + " has been added to the 'Departments' Table.");
                menuPrompt();
            });

        });
}

// //add a role 
// function addNewRole() {
//     return inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "roleTitle",
//                 message: "What is the name of the Role?",
//                 validate: roleTitleInput => {
//                     if (roleTitleInput) {
//                         return true;
//                     } else {
//                         console.log("Please enter a role.");
//                         return false;
//                     }
//                 }
//             },
//             {
//                 type: "input",
//                 name: "roleSalary",
//                 message: "What is the role's salary (ex: 100000, 80000)",
//                 validate: roleSalaryInput => {
//                     if (roleSalaryInput) {
//                         return true;
//                     } else {
//                         console.log("Please enter an amount");
//                         return false;
//                     }
//                 }
//             },
//             {
//                 type: "list",
//                 name: "roleDepartment",
//                 message: "What is the department for this role?",
//                 choices: [
//                     "Marketing",
//                     "IT", 
//                     "Finance",
//                     "Administrative"
//                 ]
//             }
//         ])
//         .then(function (response) {
//             const sql = `INSERT INTO roles (title, salary, department_id)
//             VALUES (?, ?, ?);`;
//             const params = [response.roleTitle, response.roleSalary, response.roleDepartment];
//             connection.query(sql, params, (err, res) => {
//                 if (err) throw err;
//                 console.log(response.roleTitle + " has been added to the 'Roles' Table.");
//                 menuPrompt();
//             });

//         });
// }


// // // //add an Employee
// // // function addEmployee(){
// // //   //this function returns a running of inquire.prompt(), thus returning
// // // // what it returns, which is a Promise
// // //   return inquirer
// // //   .prompt([
// // //       {
// // //           type: "input",
// // //           name: "firstname",
// // //           message: "What is the employee's first name?",
// // //           validate: firstnameInput => {
// // //               if (firstnameInput) {
// // //                 return true;
// // //               } else {
// // //                 console.log("Please enter a first name.");
// // //                 return false;
// // //               }
// // //             }
// // //       },
// // //       {
// // //           type: "input",
// // //           name: "lastname",
// // //           message: "What is the employee's last name?",
// // //           validate: lastnameInput => {
// // //               if (lastnameInput) {
// // //                 return true;
// // //               } else {
// // //                 console.log("Please enter a last name");
// // //                 return false;
// // //               }
// // //             }
// // //       },
// // //       {
// // //           type: "input",
// // //           name: "role",
// // //           message: "What is the Employee's role?",
// // //           validate: roleInput => {
// // //               if (roleInput) {
// // //                 return true;
// // //               } else {
// // //                 console.log("Please enter a role");
// // //                 return false;
// // //               }
// // //             }
// // //       },
// // //       {
// // //           type: "input",
// // //           name: "manager",
// // //           message: "Who is the Employee's manager?",
// // //       }   
// // //   ])
// // //  // .then (response => {     })
// // // }
// // // //update Employee Role
// // // function updateEmployee(){
// // //   console.log("Update Employee");
// // // }
// // // //update Employee Managers
// // // function updateManager(){
// // //   console.log("Update Manager");
// // // }
// // // //delete Department
// // // function deleteDepartment(){
// // //   console.log("Delete Department");
// // // }
// // // // delete Role
// // // function deleteRole(){
// // //   console.log("Delete Role");
// // // }
// // // // delete Employee
// // // function deleteEmployee(){
// // //    console.log("Delete Employee");
// // // }





// // // // function getAllDepartments {
// // // //   prompt inquirer
// // // //   questions for get all getAllDepartments
// // // //   .then
// // // //   call query 

// // // // }

// // // // switch statement 
// // // // case 
menuPrompt();