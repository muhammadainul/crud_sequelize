'use strict'

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	await queryInterface.createTable('Article', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		userId: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: true,
			references: {
				model: 'Users',
				key: 'id'
			}
		},
		title: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null
		},
		content: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null
		},
		published: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		isDeleted: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE
	})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	await queryInterface.dropTable('articles')
  }
};
