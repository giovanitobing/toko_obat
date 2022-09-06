const { DataTypes } = require("sequelize");

const user_doctor_prescription = (sequelize) =>{
    return sequelize.define("user_doctor_prescription", {
        img_url : {
            type: DataTypes.STRING
        }
    })
}

module.exports = user_doctor_prescription;