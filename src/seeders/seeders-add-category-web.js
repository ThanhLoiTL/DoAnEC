module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('CategoryWebs', [{
                name: 'News',
                description: 'News',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Entertaiment',
                description: 'Entertaiment',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Education',
                description: 'Education',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('CategoryWebs', null, {});
    }
};