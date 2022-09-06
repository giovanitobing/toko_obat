const { DataTypes } = require("sequelize");

const categories = (sequelize) => {
    return sequelize.define("categories", {
        category: {
            type: DataTypes.STRING,
        },

        img_url: {
            type: DataTypes.STRING,
        }
    });
};

module.exports = categories;