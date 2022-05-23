const db = require('./config/connection');

module.exports = {
    viewDepartments(){
        return db.query(`SELECT * FROM department;`);
    },

    viewRoles(){
        return db.query(`SELECT * FROM roles;`);
    },

    viewEmployees(){
        return db.query(`SELECT * FROM Employees;`);
            //by manager
        //by department
    },

    addDepartment(){
        return db.query(`INSERT INTO departments (name)
        VALUES (?);`);
    },

    addRole(){
        return db.query(`INSERT INTO roles (title, salary, department_id)
        VALUES (?, ?, ?);`);
    },

    addEmployee(){
        return db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);`);
    },

    updateRole(){
        // return db.query(`UPDATE employees
        // SET role_id = ?
        // WHERE id = 3;`);
    },

    // updateEmployeeManager(){
    //     return db.query();
    // },

    // delete(){
    //     return db.query();
    //     //department
    //     //role
    //     //employee
    // },

    // viewSalaryTotal(){
    //     return db.query();
    // },
}