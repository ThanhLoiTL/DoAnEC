'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Auctions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            timeStart: {
                allowNull: false,
                type: Sequelize.TIME
            },
            timeEnd: {
                allowNull: false,
                type: Sequelize.TIME
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            auctionMoney: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            bannerId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Auctions');
    }
};