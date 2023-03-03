const db = require('../db/connections');

const Cliente = db.sequelize.define("cliente", {
    id: {type: db.Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    nome: {type: db.Sequelize.STRING, allowNull: false},
    sobrenome: {type: db.Sequelize.STRING, allowNull: false},
    email: {type: db.Sequelize.STRING, allowNull: false}
});

// ATENCAO -- forcar a criacao da tabela. Nao deixar essa linha exposta
// Cliente.sync({force: true})

module.exports = Cliente;