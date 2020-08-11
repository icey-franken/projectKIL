'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Comments', [{
            comment: 'This is the coolest project I have ever seen',
            projectId: 1,
            userId: 1
        }, {
            comment: 'You are wrong, this is not cool.',
            projectId: 1,
            userId: 2
        }, {
            comment: 'Actually..',
            projectId: 1,
            userId: 3
        }, {
            comment: 'HOW DO I DELETE THE FACEBOOK',
            projectId: 2,
            userId: 1
        }, {
            comment: 'I can see Russia from my house',
            projectId: 3,
            userId: 2
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
        await queryInterface.bulkDelete('Comments', null, {});
    }
};