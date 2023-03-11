
const db = require('../db/connections')
const Cliente = require('./Cliente');
const Reboque = require('./Reboque');


const Cliente_Reboque = db.sequelize.define('locacao',{
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clienteId: {
    type: db.Sequelize.INTEGER,
    references: {
      model: Cliente,
      key: 'id'
    }
  },
  reboqueId: {
    type: db.Sequelize.INTEGER,
    references: {
      model: Reboque,
      key: 'id'
    }
  }
});

Cliente.belongsToMany(Reboque, {
  through: Cliente_Reboque,
  foreignKey: 'Cliente_id'
});

Reboque.belongsToMany(Cliente, {
  through: Cliente_Reboque,
  foreignKey: 'Reboque_id'
});

// Cliente_Reboque.sync({force: true});

module.exports = Cliente_Reboque;