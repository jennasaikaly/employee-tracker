// const db = require('./config/connection');
const inquirer = require("inquirer");
// const cTable = require('console.table');
const queries = require("./lib/queries");




//menu prompts
function menuPrompt(){
  return inquirer
  .prompt([
    {
      type:"list",
      name: "menu",
      message: "What would you like to do?",
      choices:[
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
    switch(response.menu){
    case "View all departments":
        viewDepartment();
        break;
    case "View all roles":
        viewRole();
        break;
    case "View all employees":
        viewEmployee();
        break;
    case "Add a department":
        addDepartment();
        break;
    case "Add a role":
        addRole();
        break;
    case "Add an employee":
        addEmployee();
        break;
    case "Update an employee role":
        updateRole();
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
//add a department
function addDepartment(){
  return inquirer
  .prompt([
    {
      type:"input",
      name: "department",
      message: "What is the department name?",
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log("Please enter a Department name.");
          return false;
        }
      }
    }
  ])
  .then(function(answers){
//   db.query(`INSERT INTO department (name) VALUES (?)`, 
//   {name: answers.name}, 
//   function(error){if (error) throw error;
    console.log("Department has been added to the database");
    menuPrompt();
})
//   const sql = `INSERT INTO department (name)
//   VALUES (?)`;
//   const params = [answers];
//   db.query(sql, params, (error, result) => {
//     if (error) throw error;
//     console.log("Department has been added");
//    });

    

}
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
 menuPrompt();