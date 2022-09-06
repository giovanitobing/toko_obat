const { DataTypes } = require("sequelize");

const order_detail = (sequelize) => {
    return sequelize.define("order_detail", {
        quantity: {
            type: DataTypes.INTEGER,
        },

        item_price: {
            type: DataTypes.DECIMAL,
        },

        tota_price: { // total harga product X quantity
            type: DataTypes.DECIMAL,
        },

        note: {
            type: DataTypes.STRING,
        }
    });

};

module.exports = order_detail;