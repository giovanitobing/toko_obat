const { DataTypes } = require("sequelize");

const stock_histories = (sequelize) => {
    return sequelize.define("stock_histories", {
        quantity: {
            type: DataTypes.STRING,
        },

        type: {
            type: DataTypes.STRING,
        },

        remarks: {
            type: DataTypes.STRING,
        }
    });
};

module.exports = stock_histories;