'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AboutYou extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            AboutYou.hasMany(models.User, {
                foreignKey: 'aboutYouId'
            })
        }
    };
    AboutYou.init({
        description: DataTypes.STRING(50)
    }, {
        sequelize,
        modelName: 'AboutYou',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return AboutYou;
};