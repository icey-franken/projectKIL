'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
                // define association here
            }
            //note that since we're using sequelize v6 we do NOT need to define instance methods on the prototype - we define them in the usual manner for JS classes
    };
    User.init({
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: { //~32 min in first auth vid
                len: [5, 50],
                msg: 'Username must be between 5 and 50 characters' //error message if input not within length constraints
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        hashedPassword: {
            type: DataTypes.STRING.BINARY
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};