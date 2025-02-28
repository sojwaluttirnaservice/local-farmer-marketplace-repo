const db = require("../config/db.connect")

const orderedProductsModel = {

    // orderedProducts is an array of objects
    insert: (orderedProducts, orderId) => {
        console.log(orderedProducts);
        let q = `INSERT INTO 
                    ordered_products
                    (
                        order_id_fk,
                        predefined_product_id_fk,
                        product_name,
                        quantity,
                        price_at_order_time,
                        total_price
                    )
                    VALUES ?`

        let insertArray = orderedProducts.map(product => {
            return [
                orderId,
                product.predefined_product_id_fk,
                product.product_name,

                product.quantity,
                product.price_at_order_time,
                product.total_price
            ]
        })

        console.log(insertArray);

        
        return db.query(q, [insertArray])
    }

}


module.exports = orderedProductsModel