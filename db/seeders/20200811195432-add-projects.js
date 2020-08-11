'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Projects', [{
                name: 'Test Project 1',
                intro: 'We are testing a project 1.',
                supplies: ['lauren', 'krisna', 'isaac'],
                destructions: ['wake up', 'start computer', 'bang out'],
                images: ['blank stare'],
                categoryId: 3,
                userId: 1
            },
            {
                name: 'Test Project 2',
                intro: 'We are testing a project 2.',
                supplies: ['lauren2', 'krisna2', 'isaac2'],
                destructions: ['wake up2', 'start computer2', 'bang out2'],
                images: ['blank stare2'],
                categoryId: 2,
                userId: 2
            },
            {
                name: 'Test Project3',
                intro: 'We are testing a project3.',
                supplies: ['lauren3', 'krisna3', 'isaac3'],
                destructions: ['wake up3', 'start computer3', 'bang out3'],
                images: ['blank stare3'],
                categoryId: 5,
                userId: 3
            }
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
        await queryInterface.bulkDelete('Projects', null, {});
    }
};