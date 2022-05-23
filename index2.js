// const db = require('./config/connection');
// const inquirer = require("inquirer");
// const cTable = require('console.table');



// //menu prompts
// function menuPrompt(){
//   return inquirer
//   .prompt([
//     {
//       type:"list",
//       name: "menu",
//       message: "What would you like to do?",
//       choices:[
//         "View all departments",
//         "View all roles",
//         "View all employees",
//         "Add a department", 
//         "Add a role",
//         "Add an employee",
//         "Update an employee role",
//         "Update employee managers",
//         "View employees by manager",
//         "View employees by department",
//         "Delete department",
//         "Delete role",
//         "Delete employee",
//         "View total utilized budget of a department",
//         "EXIT"
//       ]
//     }
//   ])
//   .then(response => {
//     console.log(response);
//     // switch(response){
//     //   case 0:
//     //     text="View all departments";
//     //     break;
//     //   case 1:
//     //     text = "View all roles";
//     //     break;
//     //   case 2:
//     //     text = "View all employees";
//     //     break;
//     //   case 3:
//     //     text = "Add a department";
//     //     addDepartment();
//     //     break;
//     //   case 4:
//     //     text = "Add a role";
//     //     addRole();
//     //     break;
//     //   case 5:
//     //     text = "Add an employee";
//     //     addEmployee();
//     //     break;
//     //   case 6:
//     //     text = "Update an employee role";
//     //     updateEmployee();
//     //     break;
//     //   case 7:
//     //     text = "Update employee managers";
//     //     updateManager();
//     //     break;
//     //   case 8:
//     //     text = "View employees by manager";
//     //     break;
//     //   case 9:
//     //     text = "View employees by department";
//     //     break;
//     //   case 10:
//     //     text = "Delete department";
//     //     deleteDepartment();
//     //     break;
//     //   case 11:
//     //     text = "Delete role";
//     //     deleteRole();
//     //     break;
//     //   case 12:
//     //     text = "Delete employee";
//     //     deleteEmployee();
//     //     break;
//     //   case 13:
//     //     text = "View total utilized budget of a department";
//     //     break;
//     //   case 13:
//     //     text = "View total utilized budget of a department";
//     //     break;
//     //   case 13:
//     //     text = "EXIT";
//     //     console.log("Thank you for using Employee Tracker");
//     //     break;
//     // }
//       })
// }
// // //add a department
// // function addDepartment(){
// //   return inquirer
// //   .prompt([
// //     {
// //       type:"input",
// //       name: "department",
// //       message: "What is the department name?",
// //       validate: result => {
// //         if (result){
// //           return true;
// //         } else {
// //           console.log("Please enter a name.");
// //           return false;
// //         }
// //       }
// //     }
// //   ])
// // .then(function(answers){
// //   console.log(answers);
// //   const sql = `INSERT INTO department (name)
// //   VALUES (?)`;
// //   const params = [answers];
// //   db.query(sql, params, (error, result) => {
// //     if (error) throw error;
// //     console.log("Department has been added");
// //     menuPrompt();
// // });
// // })
// // }
// // // //add a Role
// // // function addRole(){
// // //   //this function returns a running of inquire.prompt(), thus returning
// // // // what it returns, which is a Promise
// // //   return inquirer
// // //   .prompt([
// // //       {
// // //           type: "input",
// // //           name: "role",
// // //           message: "What is the name of the Role?",
// // //           validate: roleInput => {
// // //               if (roleInput) {
// // //                 return true;
// // //               } else {
// // //                 console.log("Please enter a role.");
// // //                 return false;
// // //               }
// // //             }
// // //       },
// // //       {
// // //           type: "input",
// // //           name: "salary",
// // //           message: "What is the role's salary",
// // //           validate: salaryInput => {
// // //               if (salaryInput) {
// // //                 return true;
// // //               } else {
// // //                 console.log("Please enter an amount");
// // //                 return false;
// // //               }
// // //             }
// // //       },
// // //       {
// // //           type: "input",
// // //           name: "department",
// // //           message: "What is the department for this role?",
// // //           validate: departmentInput => {
// // //               if (departmentInput) {
// // //                 return true;
// // //               } else {
// // //                 console.log("Please enter a department");
// // //                 return false;
// // //               }
// // //             }
// // //       }
// // //   ])
// // // //  .then (answers => {     })
// // // }
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
// menuPrompt();