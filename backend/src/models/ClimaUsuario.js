const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../instances/mysql');

class ClimaUsuario extends Model {}

ClimaUsuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        temperatura: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        condicao_clima: {
            type: DataTypes.STRING,
            allowNull: true
        },
        consultado_em: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'ClimaUsuario',
        tableName: 'web3_clima_usuarios',
        timestamps: true
    }
);

module.exports = ClimaUsuario;