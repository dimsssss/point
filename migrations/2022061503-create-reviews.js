const HAS_BONUS = 0;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('reviews', {
            reviewId: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
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
            hasPlaceBonus: {
                type: Sequelize.DataTypes.TINYINT,
                defaultValue: HAS_BONUS,
                allowNull: false
            },
            content: {
                type: Sequelize.DataTypes.STRING,
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('reviews');
    }
};