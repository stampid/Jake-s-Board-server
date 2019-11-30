"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        uique: true
      },
      nickName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: DataTypes.STRING,
      provider: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profileImg: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
