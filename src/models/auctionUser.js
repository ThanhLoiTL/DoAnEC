'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AuctionUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            AuctionUser.belongsTo(models.User, {
                foreignKey: 'userId'
            });
            AuctionUser.belongsTo(models.Auction, {
                foreignKey: 'auctionId'
            });
        }
    };
    AuctionUser.init({
        auctionId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'AuctionUser',
    });
    return AuctionUser;
};