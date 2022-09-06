const { DataTypes } = require("sequelize");

const user_address = (sequelize) =>{
    return sequelize.define("user_address", {
        address_line: {
            type: DataTypes.STRING,
        },

        province: {
            type: DataTypes.STRING
        },

        city: {
            type: DataTypes.STRING
        },
        
        post_conde: {
            type : DataTypes.INTEGER
        },
    })
}

module.exports = user_address;