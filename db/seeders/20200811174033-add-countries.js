'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Countries', [{
                name: 'USA'
            },
            {
                name: 'China'
            }, {
                name: 'Russia'
            },
        ], {});
        /**
         * Add seed commands here.
         *
         * Example:
         */
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('Countries', null, {});
    }
};