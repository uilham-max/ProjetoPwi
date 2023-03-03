const { belongsToMany } = require('sequelize');
const db = require('../db/connections');
const Cliente = require('./Cliente');
const Locacao = require('./Locacao');
// const Reserva = require('./Reserva');

const Reboque = db.sequelize.define("reboque", {
    id: {type: db.Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    modelo: {type: db.Sequelize.STRING, allowNull: false},
    placa: {type: db.Sequelize.STRING, allowNull: false},
    cor: {type: db.Sequelize.STRING, allowNull: false},
    valor: {type: db.Sequelize.INTEGER, allowNull: false}
});

Reboque.belongsToMany(Cliente, {//belongsToMany: pertence a muitos
    //qual outro modelo esse N:M deve ser ajustado
    through: {//through: através
        model: Locacao
    },
    foreignKey: 'idReboque',// chave estrangeira
    constraint: true// criar a chave estrangeira CategoriaProduto
})
Cliente.belongsToMany(Reboque, {
    through: {
        model: Locacao
    },
    foreignKey: 'idCliente',
    constraint: true// criar a chave estrangeira CategoriaProduto
})
//Super Many-To-Many Relationship
//Super muitos pra muitos
Reboque.hasMany(Locacao, {foreignKey: 'idReboque'})
Locacao.belongsTo(Reboque, {foreignKey: 'idReboque'})
Cliente.hasMany(Locacao, {foreignKey: 'idCliente'})
Locacao.belongsTo(Cliente, {foreignKey: 'idCliente'})

// Reboque.sync({force: true})

module.exports = Reboque;

