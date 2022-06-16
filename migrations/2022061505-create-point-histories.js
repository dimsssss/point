module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('point_histories', {
            pointHistoryId: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                comment: '포인트 보유자 아이디'
            },
            prevPoint: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                comment: '이전 포인트 보유량'
            },
            resultPoint: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                comment: '현재 포인트 보유량'
            },
            action: {
                type: Sequelize.DataTypes.ENUM,
                values: ['ADD', 'MOD', 'DELETE'],
                allowNull: false,
                comment: '포인트가 변경된 이유'
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
        return queryInterface.dropTable('point_histories');
    }
};
