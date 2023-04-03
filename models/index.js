'use strict';

const Sequelize = require('sequelize');
const db = {};
require('dotenv').config({})


let sequelize = new Sequelize(process.env.DATABASE , process.env.NAME , process.env.PASSWORD , {
        host: process.env.HOST,
        dialect: 'mysql'
    });
    


db.sequelize =sequelize;
db.Sequelize= Sequelize;

module.exports = db;




