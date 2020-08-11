'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Category.hasMany(models.Project, {
                foreignKey: 'categoryId'
            })
        }
    };
    Category.init({
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};