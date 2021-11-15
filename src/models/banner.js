'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Banner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Banner.belongsTo(models.Web, {
                foreignKey: 'webId',
                allowNull: false
            });

            Banner.hasMany(models.Auction, {
                foreignKey: 'bannerId',
                onDelete: "cascade"
            });
        }
    };
    Banner.init({
        name: DataTypes.STRING,
        size: DataTypes.STRING,
        price: DataTypes.BIGINT,
        image: DataTypes.STRING,
        time: DataTypes.DATE,
        status: DataTypes.INTEGER,
        webId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Banner',
    });
    return Banner;
};