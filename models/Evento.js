import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Evento = sequelize.define('Evento', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Evento;
