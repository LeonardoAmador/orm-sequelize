"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate(models) {
      People.hasMany(models.Classes, { foreignKey: "instructor_id" });
      People.hasMany(models.Enrollment, { 
        foreignKey: "student_id",
        scope: { status: "confirmed" },
        as: "enrolledClasses"
      });
    }
  }
  People.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter your name" },
          notEmpty: true,
          blankField(value) {
            if (value.trim() === "") {
              throw new Error("The field name can not be blank");
            }
          },
          nameLength(value) {
            if (value.length < 3 || value.length > 28) {
              throw new Error("The name must be at least 3 characters long");
            }
          },
        },
      },
      active: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Please enter your email address" },
          isEmail: true,
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      defaultScope: {
        where: { active: true }
      },
      scopes: {
        all: { where: {} }
      }
    },
    {
      sequelize,
      modelName: "People",
    }
  );
  return People;
};
