'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Projects', [{
            name: 'Destructuring Assignment ',
            intro: 'Lets assign properties of an array or object to variables!',
            supplies: ['JS knowledge', 'computer', 'willpower'],
            destructionsHeadings: ['do thing 1'],
            destructions: ['please refer to mdn bc i dont have time for this'],
            images: ['blank_stare.gif'],
            categoryId: 3,
            userId: 1
        },
        {
            name: 'cake cake cake',
            intro: 'Smash Cakes!',
            supplies: ['cake mix and the fixins', 'baby'],
            destructionsHeadings: ['do thing 1', 'do thing 2', 'do thing 3'],
            destructions: ['follow instructions to bake cake', 'decorate cake after cooling', 'place baby in front of cake', 'observe'],
            images: ['happy_baby.gif'],
            categoryId: 1,
            userId: 2
        },
        {
            name: 'Test Project3',
            intro: 'We are testing a project3.',
            supplies: ['lauren3', 'krisna3', 'isaac3'],
            destructionsHeadings: ['do thing 1', 'do thing 2', 'do thing 3'],
            destructions: ['wake up3', 'start computer3', 'bang out3'],
            images: ['blank_stare3.gif'],
            categoryId: 5,
            userId: 3
        },
        {
            name: 'Arggggghhhh She Blows! ',
            intro: 'We are destructing a ship by blowing it to smitherines!',
            supplies: ['cannon', 'cannon ball', 'fuse', 'lighter', 'pirate flag'],
            destructionsHeadings: ['do thing 1', 'do thing 2', 'do thing 3', 'do ting 4'],
            destructions: ['load the cannon', 'light the fuse', 'fire in the hole!', 'raise pirate flag'],
            images: ['ship_destroyed.gif'],
            categoryId: 5,
            userId: 1
        },
        {
            name: 'Smashing Pumpkins',
            intro: 'Not the band.',
            supplies: ['stomping boots'],
            destructionsHeadings: ['do thing 1', 'do thing 2', 'do thing 3', 'thing 4', 'thing5'],
            destructions: ['get your head in the game', 'strap on your boots', 'search for pumpkins', 'stomp it like it is a roach!', 'run away'],
            images: ['jack-o-lantern.gif'],
            categoryId: 3,
            userId: 2
        },
        {
            name: 'Destroy your liver',
            intro: 'Not advised for the weak.',
            supplies: ['booze', 'more booze', 'maybe a hotel room?', 'party pants', 'favorite drinking cup', 'maybe a shot glass or two', 'friends...bc dont drink alone'],
            destructionsHeadings: ['do thing 1', 'do thing 2', 'do thing 3', '4', '5', '6', '7', '8'],
            destructions: ['pregame', 'clock in', 'cheers', 'bottoms up!', 'drink some more', 'dont stop now', 'keep going', 'power hour', 'rally'],
            images: ['party_pic.gif'],
            categoryId: 7,
            userId: 3
        }
        ], {
            fields: ['name', 'intro', 'supplies', 'destructionsHeading', 'destructions', 'images', 'categoryId', 'userId']
        });
        /**
         * Add seed commands here.
         *
         * Example:
         */
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('Projects', null, {});
    }
};
