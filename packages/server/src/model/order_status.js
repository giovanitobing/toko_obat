const { DataTypes } = require("sequelize");

const order_status = (sequelize) => {
    return sequelize.define("order_status", {
        status_name:{
            type: DataTypes.STRING
        }
    });

};

module.exports = order_status;