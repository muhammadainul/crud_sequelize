'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return [
		queryInterface.changeColumn('UserDetails', 'id', {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		})
    ]
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
