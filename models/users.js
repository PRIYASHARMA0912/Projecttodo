const Sequelize= require('sequelize')
const sequelize = require('./index').sequelize

const user = sequelize.define('users', {
    firstname: {
        type: Sequelize.STRING,
        allowNull : false
    },
     lastname:{
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

module.exports= user