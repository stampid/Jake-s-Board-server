"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      like: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      unLike: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};
