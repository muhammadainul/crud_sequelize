'use strict';
const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
	  // define association here
	  Article.belongsTo(models.Users, { foreignKey: 'userId' })
    }
  }
  Article.init({
    id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: true,
		references: {
			model: 'Users',
			key: 'id'
		}
	},
	title: {
		type: DataTypes.STRING,
		allowNull: true
	},
	content: {
		type: DataTypes.STRING,
		allowNull: true
	},
	published: {
		type: DataTypes.BOOLEAN,
		allowNull: true
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
    modelName: 'Article',
	freezeTableName: true
  })
  
  return Article
};