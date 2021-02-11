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
      queryInterface.addColumn('UserDetails', 'id', {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      }),

      queryInterface.addColumn('Articles', 'id', {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      }),
      queryInterface.addColumn('Articles', 'userId', {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'Users',
          key: 'id'
        }
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
    try {
      return [
        queryInterface.removeColumn('UserDetails', 'id'),
        queryInterface.removeColumn('Articles', 'id'),
        queryInterface.removeColumn('Articles', 'userId'),
      ] 
    } catch (error) {
        throw error
    }
  }
};
