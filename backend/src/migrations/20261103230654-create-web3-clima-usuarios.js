'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('web3_clima_usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      temperatura: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      condicao_clima: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      consultado_em: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('web3_clima_usuarios', ['usuario_id'], {
      unique: true,
      name: 'web3_clima_usuarios_usuario_id_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('web3_clima_usuarios');
  },
};