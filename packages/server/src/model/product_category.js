const { DataTypes } = require("sequelize");

const product_categories = (sequelize) => {
    return sequelize.define("product_categories", {

    });
};

module.exports = product_categories;