module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [{
                roleName: 'User',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                roleName: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Roles', null, {});
    }
};