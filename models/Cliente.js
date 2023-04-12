const db = require('../db/connections');

const Cliente = db.sequelize.define('cliente',{
    id: {type: db.Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nome: {type: db.Sequelize.STRING, allowNull: false},
    sobrenome: {type: db.Sequelize.STRING, allowNull: false},
    email: {type: db.Sequelize.STRING, allowNull: false}
});

//Cliente.sync({force:true}) // remover force true

module.exports = Cliente;