module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            userId: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
                allowNull: false
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};
