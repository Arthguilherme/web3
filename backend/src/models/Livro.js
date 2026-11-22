const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../instances/mysql');

class Livro extends Model {}

Livro.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ol_key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ano_publicacao: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        capa_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('quero_ler', 'lendo', 'lido'),
            allowNull: false,
            defaultValue: 'quero_ler'
        },
        nota: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 5 }
        }
    },
    {
        sequelize,
        modelName: 'Livro',
        tableName: 'web3_livros',
        timestamps: true
    }
);

module.exports = Livro;