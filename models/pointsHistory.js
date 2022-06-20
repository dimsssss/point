const {v4: uuidv4} = require('uuid');
const {format} = require('date-fns');
const ACTIONS = ['ADD', 'MOD', 'DELETE'];

module.exports = (sequelize, DataTypes) => {
    const pointsHistory = sequelize.define('pointsHistory', {
        historyId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        reviewId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        action: {
            type: DataTypes.ENUM,
            values: ACTIONS,
            allowNull: false
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        tableName: 'points_history'
    });

    pointsHistory.addUserPointHistory = async (history, t) => {
        return await pointsHistory.create(history, {transaction: t}).catch((err) => {return err;});
    }

    pointsHistory.mapFrom = (data, point) => {
        const historyId = uuidv4();
        const {userId, placeId, reviewId, action} = data;
        return {
            historyId,
            userId,
            placeId,
            reviewId,
            action,
            point
        }
    }

    return pointsHistory;
}
