'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WinAuction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            WinAuction.belongsTo(models.User, {
                foreignKey: 'userId'
            });
            WinAuction.belongsTo(models.Auction, {
                foreignKey: 'auctionId'
            });
        }
    };
    WinAuction.init({
        auctionId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        yourBanner: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'WinAuction',
    });
    return WinAuction;
};