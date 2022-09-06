const { DataTypes } = require("sequelize");

const user = (sequelize) => {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },

    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date_of_birth: {
      type: DataTypes.DATE,
    },

    avatar_url: {
      type: DataTypes.STRING,
    },

    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
    },

    role: {
      type: DataTypes.STRING,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  });
};

module.exports = user;
