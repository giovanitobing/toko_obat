const { DataTypes } = require("sequelize");

const product_stock = (sequelize) => {
    return sequelize.define("product_stock", {
        stock: {
            type: DataTypes.INTEGER,
        },
        
        purchase_price: {
            type: DataTypes.DECIMAL,
        },

        sell_price: {
            type: DataTypes.DECIMAL,
        },

        total_item_sold: {
            type: DataTypes.INTEGER
        },

        is_converted: {
            type: DataTypes.BOOLEAN,
        },
    });

};

module.exports = product_stock;