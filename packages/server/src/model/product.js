const { DataTypes } = require("sequelize");

const product = (sequelize) => {
    return sequelize.define("product", {
        product_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        product_name: {
            type: DataTypes.STRING
        },

        need_prescription: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
    });
};

module.exports = product;