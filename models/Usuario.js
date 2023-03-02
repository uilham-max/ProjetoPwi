const db = require('../db/connections');

const Usuario = db.sequelize.define("usuario", {
    usuario: {type: db.Sequelize.STRING, allowNull: false},
    senha: {type: db.Sequelize.STRING, allowNull: false}
});

//Usuario.sync({force: true});

module.exports = Usuario;