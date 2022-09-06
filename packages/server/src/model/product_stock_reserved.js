const { DataTypes } = require("sequelize");

const product_stock_reserved = (sequelize) => {
    return sequelize.define("product_stock_reserved", {
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
};

module.exports = product_stock_reserved;