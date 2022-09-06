const { DataTypes } = require("sequelize");

const order = (sequelize) => {
    return sequelize.define("order", {
        invoice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        shipping_price: {
            type: DataTypes.DECIMAL,
        },

        order_price: { // total harga dengan tambahan shipping
            type: DataTypes.DECIMAL,
        },
        
        cancle_desc: {
            type: DataTypes.STRING,
        }
    });

};

module.exports = order;