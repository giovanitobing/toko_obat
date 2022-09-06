const { DataTypes } = require("sequelize");

const product_description = (sequelize) => {
    return sequelize.define("product_description", {
        nomor_ijin_edar: {
            type: DataTypes.INTEGER
        },

        kegunaan: {
            type: DataTypes.STRING
        },

        kandungan: {
            type: DataTypes.STRING
        },

        kemasan: {
            type: DataTypes.STRING
        },

        golongan: {
            type: DataTypes.STRING
        },

        need_prescription: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },

        cara_pakai: {
            type: DataTypes.STRING
        },

        cara_penyimpanan: {
            type: DataTypes.STRING
        },

        pringatan: {
            type: DataTypes.STRING
        },
    });
};

module.exports = product_description;