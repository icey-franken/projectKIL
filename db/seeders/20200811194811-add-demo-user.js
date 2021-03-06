'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [{
                username: 'DemoUser',
                email: 'demo@user.com',
                hashedPassword: await bcrypt.hash('password', 10),
                countryId: 1,
                aboutYouId: 1,
            },
            {
                username: 'DemoUser2',
                email: 'demo2@user.com',
                hashedPassword: await bcrypt.hash('password', 10),
                countryId: 2,
                aboutYouId: 2,
            },
            {
                username: 'DemoUser3',
                email: 'demo3@user.com',
                hashedPassword: await bcrypt.hash('password', 10),
                countryId: 3,
                aboutYouId: 3,
            }
        ], {
            fields: ['username', 'email', 'hashedPassword', 'countryId', 'aboutYouId']
        }); //by adding fields key to options object we tell seeded to only save those values to database - i.e. no createdAt or updatedAt - they just take on default value (which is 'now')
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};