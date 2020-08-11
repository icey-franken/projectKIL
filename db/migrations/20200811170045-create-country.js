'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Countries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(50),
            },
            code: {
                type: Sequelize.STRING(50),
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Countries');
    }
};