'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
	  // define association here
		UserDetail.hasOne(models.Users, { foreignKey: 'userDetail' })
    }
  };
  UserDetail.init({
    id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
    },
	email: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: null
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: null
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true
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
	modelName: 'UserDetail',
	freezeTableName: true
  })

  return UserDetail
}