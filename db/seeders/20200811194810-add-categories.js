'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', [
            { name: 'Circuits' },
            { name: 'Workshop' },
            { name: 'Craft' },
            { name: 'Cooking' },
            { name: 'Living' },
            { name: 'Outside' },
            { name: 'Teachers' },
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
        await queryInterface.bulkDelete('Categories', null, {});
    }
};