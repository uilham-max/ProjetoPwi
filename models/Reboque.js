const { BelongsTo } = require('sequelize');
const db = require('../db/connections');
const Cliente = require('./Cliente');
const Reserva = require('./Reserva');

const Reboque = db.sequelize.define("reboque", {
    id: {type: db.Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    modelo: {type: db.Sequelize.STRING, allowNull: false},
    placa: {type: db.Sequelize.STRING, allowNull: false},
    cor: {type: db.Sequelize.STRING, allowNull: false},
    valor: {type: db.Sequelize.INTEGER, allowNull: false}
});

Cliente.belongsToMany(Reboque, {
    through: {
        model: Reserva
    },
    
    foreignKey: 'idCliente',
    constraint: true
})
Reboque.belongsToMany(Cliente, {
    through:{
        model: Reserva
    },
    foreignKey: 'idReboque',
    constraint: true
})


// ATENCAO -- forcar a criacao da tabela. Nao deixar essa linha exposta
// Reboque.sync({force: true})

module.exports = Reboque;
