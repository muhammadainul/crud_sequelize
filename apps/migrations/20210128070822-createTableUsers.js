'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.UUID });
     */
	await queryInterface.createTable('Users', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			firstname: Sequelize.STRING,
			lastname: {
				type: Sequelize.STRING,
				allowNull: true
			},
			userDetail: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: true,
				defaultValue: null,
				references: {
					model: 'UserDetail',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
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
	await queryInterface.dropTable('Users')
  }
};
