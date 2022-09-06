const { DataTypes } = require("sequelize");

const product_unit = (sequelize) => {
    return sequelize.define("product_unit", {
        unit_name: {
            type: DataTypes.STRING,
        },
    });
};

module.exports = product_unit;