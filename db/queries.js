const connection = require('../config/connection');

module.exports = {
    readDepartments(){
        return connection.query(`SELECT * FROM department;`,);
        // with placeholder
connection.query(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Page', 45],
    function(err, results) {
      console.log(results);
    }
  );
    },

    readRoles(){
        return connection.query(`SELECT * FROM roles;`);
    },

    readEmployees(){
        return connection.query(`SELECT * FROM Employees;`);
            //by manager
        //by department
    },

    addDepartment(){
        return connection.query(`INSERT INTO departments (name)
        VALUES (?);`);
    },

    addRole(){
        return connection.query(`INSERT INTO roles (title, salary, department_id)
        VALUES (?, ?, ?);`);
    },

    addEmployee(){
        return connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);`);
    },

    updateRole(){
        // return connection.query(`UPDATE employees
        // SET role_id = ?
        // WHERE id = 3;`);
    },

    // updateEmployeeManager(){
    //     return connection.query();
    // },

    // delete(){
    //     return connection.query();
    //     //department
    //     //role
    //     //employee
    // },

    // viewSalaryTotal(){
    //     return connection.query();
    // },
}