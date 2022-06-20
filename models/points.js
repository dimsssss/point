const {v4: uuidv4} = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const points = sequelize.define('points', {
        pointId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        placeId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        reviewId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        hasBonus: {
            type: DataTypes.TINYINT,
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
        freezeTableName: true,
    });

    points.findTotalPointByUserId = async (userId, t) => {
        const result = await points
            .findAll({where:{userId}, attributes: ['userId', [sequelize.fn('sum', sequelize.col('point')), 'totalPoint']], raw: true})
            .catch((err) => {
                throw err;
            });
        return result.pop();
    }

    points.findPointThatReceivedPlaceBonus = async (placeId, t) => {
        const result = await points.findOne({where: {placeId, hasBonus: true}, transaction: t}).catch((err) => {
            throw err;
        });

        if (result === null) {
            return null;
        }
        return result.get({plain:true});
    }

    points.findPointByReviewId = async (reviewId, transaction) => {
        const result = await points.findOne({where:{reviewId}, transaction}).catch((err) => {
            throw err;
        });

        if (result === null) {
            return null;
        }

        return result.get({plain:true});
    }

    points.findDuplicatedPoint = async (data, transaction) => {
        const result = await points.findOne({where:{userId: data.userId, placeId: data.placeId}, transaction}).catch((err) => {
            throw err;
        });

        if (result === null) {
            return null;
        }

        return result.get({plain:true});
    }

    points.addUserPoint = async (point, t) => {
        const result = await points.create(point, {transaction: t}).catch((err) => {throw err});

        if (result === null) {
            return null
        }
    }

    points.updatePoint = async (point, t) => {
        const result = await points
            .update(point, {where: {reviewId:point.reviewId}, transaction: t, plain: true})
            .catch((err) => { throw err });
        return result;
    }

    points.deletePoint = async (point, t) => {
        return await points.destroy({where:{userId:point.userId, reviewId:point.reviewId}, transaction: t}).catch((err) => {
            throw err;
        })
    }

    points.mapFrom = (data, point, hasBonus) => {
        const pointId = data.pointId || uuidv4();
        const {userId, placeId, reviewId} = data;
        const createdAt = new Date().toISOString();
        console.log(createdAt);
        const updatedAt = createdAt;
        return {
            pointId,
            userId,
            placeId,
            reviewId,
            point,
            hasBonus,
            createdAt,
            updatedAt
        }
    }

    return points;
}
