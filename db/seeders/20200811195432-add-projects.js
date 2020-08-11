'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Projects', [{
            name: 'Test Project',
            intro: 'We are testing a project.',
            supplies: ['lauren', 'krisna', 'isaac'],
            destructions: ['wake up', 'start computer', 'bang out'],
            images: ['blank stare'],
            categoryId: 3,
            userId: 1
        }], {});
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
        await queryInterface.bulkDelete('Projects', null, {});
    }
};