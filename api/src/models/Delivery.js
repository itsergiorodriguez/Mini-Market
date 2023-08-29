const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Delivery', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        receives: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pickUp: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
            
        },
        delivery: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false

            
        },
       


    }, { timestamps: false, freezeTableName: true })
};
