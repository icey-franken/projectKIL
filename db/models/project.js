"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      Project.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Project.hasMany(models.Comment, {
        foreignKey: "projectId",
      });
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      intro: DataTypes.TEXT,
      supplies: DataTypes.ARRAY(DataTypes.TEXT),
      destructionsHeadings: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      destructions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      images: DataTypes.ARRAY(DataTypes.TEXT),
      categoryId: {
        type: DataTypes.INTEGER,
        references: { model: "Categories" },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
