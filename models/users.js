const { v4 : uuidv4 } = require('uuid');
const { format } = require('date-fns');

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
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

    users.signUpUser = async (data) => {
        const userId = uuidv4();
        const result = await users.create({...data, userId}).catch((err) => {
            return err;
        });
        return result;
    }

    return users;
}
