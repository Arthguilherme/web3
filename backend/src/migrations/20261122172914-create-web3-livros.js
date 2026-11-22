'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('web3_livros', {
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
      ol_key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ano_publicacao: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      capa_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('quero_ler', 'lendo', 'lido'),
        allowNull: false,
        defaultValue: 'quero_ler',
      },
      nota: {
        type: Sequelize.INTEGER,
        allowNull: true,
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

    await queryInterface.addIndex('web3_livros', ['usuario_id', 'ol_key'], {
      unique: true,
      name: 'web3_livros_usuario_livro_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('web3_livros');
  },
};