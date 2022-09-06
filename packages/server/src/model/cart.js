const { DataTypes } = require("sequelize");

const cart = (sequelize) => {
    return sequelize.define("cart", {
        quantity: {
            type: DataTypes.INTEGER,
        },

        product_price: {
            type: DataTypes.DECIMAL,
        },

        price_total: {
            type: DataTypes.DECIMAL,
        },
    });
};

module.exports = cart;