const db = require('../db/connections');

const Locacao = db.sequelize.define("locacao", {
    id: {type: db.Sequelize.INTEGER, autoIncrement: true , allowNull: false, primaryKey: true},
    
})