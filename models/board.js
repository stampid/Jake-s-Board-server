"use strict";
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      creator: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Board.associate = function(models) {
    // associations can be defined here
  };
  return Board;
};
