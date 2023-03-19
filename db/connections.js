const Sequelize = require('sequelize') // https://sequelize.org/docs/v6/getting-started/
const config = require('./config.js')

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host, // localidade do banco
    dialect: config.dialect  
})

sequelize.authenticate().then(()=>{
    console.log("'./db/connections' -> conectado ao banco postresql.")
}).catch((erro)=>{
    console.log(`'./db/connections' -> erro ao conectar com o banco: ${erro}`)
})

module.exports = {Sequelize, sequelize}

