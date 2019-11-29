"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      board: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      creaotr: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};
