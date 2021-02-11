'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('UserDetail', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true,
				defaultValue: null
			},
			password: {
				type: Sequelize.STRING,
				allowNull: true,
				defaultValue: null
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
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
    await queryInterface.dropTable('UserDetail', 'UserDetail')
  }
};
