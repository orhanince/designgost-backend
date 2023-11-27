module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.addColumn('user', 'bio', {
        allowNull: true,
        type: Sequelize.TEXT,
        after: 'password',
      }),
      await queryInterface.addColumn('user', 'hair_color', {
        allowNull: true,
        type: Sequelize.STRING,
        after: 'bio',
      }),
      await queryInterface.addColumn('user', 'favorite_food', {
        allowNull: true,
        type: Sequelize.STRING,
        after: 'hair_color',
      }),
    ];
  },

  async down(queryInterface) {
    return [
      await queryInterface.removeColumn('user', 'bio'),
      await queryInterface.removeColumn('user', 'hair_color'),
      await queryInterface.removeColumn('user', 'favorite_food'),
    ];
  },
};
