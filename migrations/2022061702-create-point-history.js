const ACTIONS = ['ADD', 'MOD', 'DELETE'];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('points_history', {
            historyId: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                allowNull: false
            },
            userId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false
            },
            reviewId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false
            },
            action: {
                type: Sequelize.DataTypes.ENUM,
                values: ACTIONS,
                allowNull: false
            },
            point: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
                allowNull: false,
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('points_history');
    }
};
