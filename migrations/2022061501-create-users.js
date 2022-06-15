module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            userId: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                allowNull: false
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};