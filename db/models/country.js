'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Country extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Country.hasMany(models.User, {
                foreignKey: 'countryId'
            })
        }
    };
    Country.init({
        name: DataTypes.STRING(50),
        code: DataTypes.STRING(5)
    }, {
        sequelize,
        modelName: 'Country',
        // timestamps: false -- we may need to uncomment this
    });
    return Country;
};