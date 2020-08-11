'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('AboutYous', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.ENUM('Teacher', 'Student', 'Hobbyist')
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('AboutYous');
    }
};