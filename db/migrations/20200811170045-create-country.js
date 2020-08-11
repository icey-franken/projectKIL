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
                type: Sequelize.ENUM('USA', 'China', 'Russia')
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Countries');
    }
};