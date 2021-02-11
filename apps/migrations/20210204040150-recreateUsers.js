'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	await queryInterface.createTable('Users', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		firstname: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null
		},
		lastname: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null
		},
		userDetail: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: true,
			defaultValue: null,
			references: {
				model: 'UserDetail',
				key: 'id'
      		}
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
	await queryInterface.createTable('Users', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		firstname: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null
		},
		lastname: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: null
		},
		userDetail: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: true,
			defaultValue: null,
			references: {
				model: 'UserDetail',
				key: 'id'
      		}
		},
		isDeleted: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE
	})
  }
};
