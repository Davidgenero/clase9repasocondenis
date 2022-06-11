// const pool = require("mysql/lib/Pool")
const pool = require("../db/config")

// -------------------------------------------------------------------------
//get all users
const getAllUsers = async () => {
    const query = "SELECT * FROM users"
    try {
        return await pool.query(query)
    } catch (error) {
       error.message = error.code
       return error
    }
}

//get user by id
const getUserById = async (id) => {
        const query = `SELECT * FROM users WHERE id = ${id}`
        try {
            return await pool.query(query)
        } catch (error) {
            error.message = error.code
            return error
        }
    }
    // -----------------------------------------------------------------------------



//Register new User
const registerNewUser = async (user) => {
    const query = `INSERT INTO users SET ?`
        try {
            return await pool.query(query, user)
        } catch (error) {
            error.message = error.code
            return error
        }
}      

//Login User
const loginUser = async(email) => {
    const query = `SELECT * FROM users WHERE email = '${email}'`
    try {
        return await pool.query(query);
    } catch (error) {
        error.message = error.code
        return error
    }
   
}


//delete user
const deleteUserById = async (id) => {
    const query = `DELETE FROM users WHERE id = ${id}`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

//edit user
const editUserById = async (id, user) => {
    const query = `UPDATE users SET ? WHERE id = ${id}` // check where with destruct
    try {
        return await pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}

module.exports = { getAllUsers, getUserById, registerNewUser, loginUser, deleteUserById, editUserById }