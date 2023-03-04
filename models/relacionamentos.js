
const {sequelize} = require('../db/connections')
const Cliente = require('./models/Cliente');
const Reboque = require('./models/Reboque');
const Locacao = require('./models/Locacao');


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


// sequelize.sync({force: true})// retriar o force: true para não criar novamente


module.exports = {Reboque: Reboque, Cliente: Cliente, Locacao: Locacao};