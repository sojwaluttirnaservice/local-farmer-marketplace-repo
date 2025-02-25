const db = require("../config/db.connect");

const adminModel = {

    getAdminByUsername: (username) => {
        let q = `SELECT * FROM admins WHERE username = ?`
        return db.query(q, [username])
    }
}

module.exports = adminModel;
