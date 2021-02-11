'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Articles', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		userId: {
			type: Sequelize.UUID,
      allowNull: true,
      defaultValue: null,
			references: {
				model: 'Users',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		},
		title: {
			type: Sequelize.STRING,
			allowNull: true
		},
		content: {
			type: Sequelize.STRING,
			allowNull: true
		},
		published: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
		isDeleted: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		onUpdate: Sequelize.DATE,
		onDelete: Sequelize.DATE
	})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	await queryInterface.dropTable('Articles')
  }
};
