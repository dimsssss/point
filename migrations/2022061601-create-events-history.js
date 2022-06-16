const ACTINOS = ['ADD', 'MOD', 'DELETE'];

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('events_history', {
            eventHistoryId: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            reviewId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false
            },
            userId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false
            },
            placeId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false
            },
            action: {
                type: Sequelize.DataTypes.ENUM,
                values: ACTINOS,
                allowNull: true
            },
            createdAt: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updatedAt: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
                allowNull: false,
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            indexes: [{
                fields: ['placeId', 'action']
            }]
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('events_history');
    }
};
