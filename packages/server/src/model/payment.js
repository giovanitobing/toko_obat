const { DataTypes } = require("sequelize");

const payment = (sequelize) => {
    return sequelize.define("payment", {
        payment_reciep_url: {
            type: DataTypes.STRING,
        },
        
    });

};

module.exports = payment;