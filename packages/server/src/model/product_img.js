const { DataTypes } = require("sequelize");

const product_img = (sequelize) => {
    return sequelize.define("product_img", {
        img_url: {
            type: DataTypes.STRING,
        },
    });
};

module.exports = product_img;