'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('AboutYous', [{
                description: 'Hobbyist'
            },
            {
                description: 'Student'
            },
            {
                description: 'Teacher (Ages 5-7 yrs.)'
            },
            {
                description: 'Teacher (Ages 8-10 yrs.)'
            },
            {
                description: 'Teacher (Ages 11-13 yrs.)'
            },
            {
                description: 'Teacher (Ages 14-17 yrs.)'
            },
            {
                description: 'Teacher (Ages 18+ yrs.)'
            },
            {
                description: 'Parent'
            },
            {
                description: 'Professional'
            },
            {
                description: 'Robot'
            },
        ], {
            fields: ['description']
        });
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('AboutYous', null, {});
    }
};