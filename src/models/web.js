'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Web extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Web.belongsTo(models.CategoryWeb, {
                foreignKey: 'categoryId',
                allowNull: false
            });

            Web.hasMany(models.Banner, {
                foreignKey: 'webId',
                onDelete: "cascade"
            });
        }
    };
    Web.init({
        name: DataTypes.STRING,
        link: DataTypes.STRING,
        image: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Web',
    });
    return Web;
};