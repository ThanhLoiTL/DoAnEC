'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('winauctions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            auctionId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            yourBanner: {
                type: Sequelize.STRING
            },
            status: {
                allowNull: false,
                type: Sequelize.INTEGER
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('winauctions');
    }
};