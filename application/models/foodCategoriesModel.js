const db = require("../config/db.connect");

const foodCategoriesModel = {

    list: () => {
        let q = `SELECT 
                    id AS food_category_id,
                    category_name AS food_category_name
                FROM food_categories`;

        return db.query(q)
    }
}


module.exports = foodCategoriesModel