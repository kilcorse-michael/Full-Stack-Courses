'use strict'

const Sequelize = require('sequelize');
const Course = require('./course.js');

module.exports = (sequelize) => {
const User = sequelize.define('User', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty:{
        args: true,
        msg: "Please Provide a First Name!"
      }
      }
    },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty:{
        args: true,
        msg: "Please Provide a Last Name!"
      }
      }
    },
  emailAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty:{
        args: true,
        msg: "Please Provide an email address!"
      }
      }
    },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty:{
        args: true,
        msg: "Please Provide a Password!"
      }
    }
  },

}, {sequelize});


User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'Creator',
      foreignKey: "userId"
    });
}
return User;
}
