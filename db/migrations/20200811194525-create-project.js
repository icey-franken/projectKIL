'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            intro: {
                type: Sequelize.TEXT
            },
            supplies: {
                type: Sequelize.ARRAY(Sequelize.TEXT)
            },
            destructionsHeadings: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
            },
            destructions: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
                // allowNull: false
            },
            images: {
                type: Sequelize.ARRAY(Sequelize.TEXT)
            },
            categoryId: {
                type: Sequelize.INTEGER,
                references: { model: 'Categories' }
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: 'Users' }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Projects');
    }
};