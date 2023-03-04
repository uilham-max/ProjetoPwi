const { belongsToMany } = require('sequelize');
const db = require('../db/connections');
const Cliente = require('./Cliente');
const Locacao = require('./Locacao');
const sequelize = require('../db/connections')
// const Reserva = require('./Reserva');

const Reboque = db.sequelize.define("reboque", {
    id: {type: db.Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    modelo: {type: db.Sequelize.STRING, allowNull: false},
    placa: {type: db.Sequelize.STRING, allowNull: false},
    cor: {type: db.Sequelize.STRING, allowNull: false},
    valor: {type: db.Sequelize.INTEGER, allowNull: false}
});

// Reboque.sync({force: true})

module.exports = Reboque;

