import { sequelize, Op, DataTypes } from '../config/database.js';

const User = sequelize.define('Users', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    status: {
        type: DataTypes.ENUM("0","1"),
        allowNull: false,
        defaultValue: "0"
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true 
});

export { User, Op };
