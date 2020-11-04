const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = process.env.NODE_ENV === 'production'
    ? new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres', protocal: 'postgres' })
    : new Sequelize('sqlite::memory:')

class User extends Model {}
class Project extends Model {}
class Task extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    avatarUrl: DataTypes.STRING

}, { sequelize });

Project.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING

}, { sequelize });

Task.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    desc: DataTypes.STRING,
    status: DataTypes.NUMBER

}, { sequelize });

Project.hasMany(Task, { onDelete: 'cascade' });
Task.belongsTo(Project);

User.hasMany(Task, { onDelete: 'cascade' });
Task.belongsTo(User);

module.exports = {
    User,
    Project,
    Task,
    sequelize
}