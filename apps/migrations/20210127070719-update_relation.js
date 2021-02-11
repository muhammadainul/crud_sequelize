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
      queryInterface.addColumn('Users', 'id', {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
	  }),
	  queryInterface.addColumn('Users', 'lastname', {
        type: DataTypes.STRING,
      	allowNull: true
	  }),
	  queryInterface.addColumn('Users', 'userId', {
        type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: true,
		defaultValue: null,
		references: {
			model: 'userDetails',
			key: 'id',
			as: 'userId'
		}
	  }),
	  queryInterface.addColumn('Users', 'isDeleted', {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
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
	return [
		queryInterface.removeColumn('Users', 'id')
	]
  }
};
