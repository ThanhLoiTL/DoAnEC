module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            id: 999999,
            fullName: 'Admin',
            email: 'admin@gmail.com',
            password: '123',
            phone: '',
            address: '',
            money: 0,
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};