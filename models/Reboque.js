
const db = require('../db/connections');

const Reboque = db.sequelize.define('reboque',{
    id: {type: db.Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    modelo: {type: db.Sequelize.STRING, allowNull: false},
    placa: {type: db.Sequelize.STRING, allowNull: false},
    cor: {type: db.Sequelize.STRING, allowNull: false},
    valor: {type: db.Sequelize.INTEGER, allowNull: false}
});

// Reboque.sync({force: true});

module.exports = Reboque;



