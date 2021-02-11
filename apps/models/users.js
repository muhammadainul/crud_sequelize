'use strict'

const { Model, Sequelize } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
	  	// define association here
		Users.belongsTo(models.UserDetail, { foreignKey: 'userDetail', as: 'detail' })
		Users.hasMany(models.Article, { foreignKey: 'userId', as: 'article' })
	  }
  }

  Users.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    firstname: DataTypes.STRING,
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userDetail: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'UserDetail',
        key: 'id'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: { 
		type: DataTypes.DATE,
		field: 'createdAt'
	},
    updatedAt: { 
		type: DataTypes.DATE,
		field: 'updatedAt'
	}
  }, {
    sequelize,
    modelName: 'Users',
	freezeTableName: true
  })

  return Users
}