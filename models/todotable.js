const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize

const todos = sequelize.define('TODO' ,  {
    todo: {
        type : Sequelize.STRING,
        allowNull : false
    },
    userId : {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    isDone : {
         type: Sequelize.BOOLEAN
    }
})

todos.belongsto(users)
module.exports = todos
