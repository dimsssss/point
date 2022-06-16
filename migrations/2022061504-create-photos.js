module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('photos', {
            photoId: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                comment: '차후 관련된 기능 확장시에 index를 적용'
            },
            reviewId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                comment: '차후 관련된 기능 확장시에 index를 적용'
            },
            placeId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                comment: '차후 관련된 기능 확장시에 index를 적용'
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
        return queryInterface.dropTable('photos');
    }
};
