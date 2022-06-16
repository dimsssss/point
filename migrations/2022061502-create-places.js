module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('places', {
            placeId: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            isBonus: {
                type: Sequelize.DataTypes.TINYINT,
                defaultValue: 1,
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
            collate: 'utf8mb4_general_ci',
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('places');
    }
};
