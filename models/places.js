const { v4 : uuidv4 } = require('uuid');
const { format } = require('date-fns');

module.exports = (sequelize, DataTypes) => {
    const places = sequelize.define('places', {
        placeId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isBonus: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                const dateText = this.getDataValue('createdAt');
                return format(new Date(dateText), 'yyyy-MM-dd HH:mm:ss');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                const dateText = this.getDataValue('updatedAt');
                return format(new Date(dateText), 'yyyy-MM-dd HH:mm:ss');
            }
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        freezeTableName: true,
    });

    places.addPlace = async (data) => {
        const placeId = uuidv4();
        const result = await places.create({...data, placeId}).catch((err) => {
            return err;
        });
        return result;
    }

    return places;
}
