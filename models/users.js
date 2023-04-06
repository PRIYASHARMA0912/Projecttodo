const Sequelize= require('sequelize');
const roles = require('./roles');
const sequelize = require('./index').sequelize

const users = sequelize.define('users', {
    firstName: {
        type: Sequelize.STRING,
        allowNull : false
    },
     lastName:{
        type: Sequelize.STRING,
        allowNull : false
     },
     email:{
        type: Sequelize.STRING,
        allowNull : false,
        unique: true
     },
     password:{
        type: Sequelize.STRING,
        allowNull : false
     },
})

 user.belongsTo(roles);
module.exports= users