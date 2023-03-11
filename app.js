const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const { where } = require('sequelize');
const Usuario = require('./models/Usuario');

const Cliente = require('./models/Cliente');
const Reboque = require('./models/Reboque');
const Cliente_Reboque = require('./models/Locacao')



// working whith json
app.use(express.urlencoded(
    {extended: true}
))
app.use(express.json());


// working whith view engine - handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // essas configurações tornam a aplicação insegura
        allowProtoMethodsByDefault: true,
    },
}) )
app.set('view engine', 'handlebars')


app.get('/', (req,res) => {
    res.render('index')
})



app.get('/cadastrar_cliente', (req,res) => {
    res.render('cadastrar_cliente')
})
app.post('/cadastrar_cliente', (req,res)=>{
    
    var regexNome = /^[A-Za-z]+$/;
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    
    if(!(req.body.nome.match(regexNome))){
        res.render('cadastrar_cliente', {msgErro: "Nome invalido."} )
    } else if (!(req.body.sobrenome.match(regexNome))){
        res.render('cadastrar_cliente', {msgErro: "Sobre nome invalido."} )
    } else if(!(req.body.email.match(emailRegex))) {
        res.render('cadastrar_cliente', {msgErro: "Email invalido."} )
    } else {

         Cliente.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email
        }).then(()=>{
            console.log(`cliente gravo com sucesso.`);
            res.render('cadastrar_cliente', {msgErro: "Cliente salvo."})
        }).catch((erro)=>{
            console.log(`erro ao inserir: ${erro}.`)
            res.redirect('/cadastrar_cliente');
        })
    }
})
app.get('/mostrar_cliente', async (req,res)=>{
    Cliente.findAll().then((clientes)=>{
        res.render('mostrar_cliente', {clientes: clientes})
    })
})
app.get('/editar_cliente/:id', async (req,res)=>{
    
    id = req.params.id
    let cliente =  await Cliente.findOne({
        where: {id: req.params.id}
    })
    console.log(cliente)
    res.render('editar_cliente', cliente)
})
app.post('/editar_cliente', (req,res)=>{
    Cliente.update({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email
    },{
        where: {id: id},
    }).then(()=>{
        console.log("Cliente editado com sucesso.")
        res.redirect('/mostrar_cliente')
    }).catch((err)=>{
        console.log(`Nao pode editar ${err}`)
        //res.redirect('/mostrar_cliente')
    })
})
app.get('/deletar_cliente/:id', (req,res)=>{
    Cliente.destroy({
        where: {'id': req.params.id}
    }).then(()=>{
        console.log("Cliente excluido com sucesso!")
        res.redirect('/mostrar_cliente')
    }).catch((err)=>{
        console.log(`erro ao excluir Cliente ${err}`)
        res.redirect('/mostrar_cliente')
    })
})





app.get('/cadastrar_reboque', (req,res)=>{
    res.render('cadastrar_reboque')
})
app.post('/cadastrar_reboque', (req,res)=>{
    console.log(`Valor: ${req.body.valor}`);
    Reboque.create({
        modelo: req.body.modelo,
        placa: req.body.placa,
        cor: req.body.cor,
        valor: req.body.valor
    }).then(()=>{
        console.log(`reboque salvo com sucesso`);
        res.render('cadastrar_reboque', {msgErro: "Reboque salvo"});
    }).catch((erro)=>{
        console.log(`erro ao inserir: ${erro}`);
        res.render('cadastrar_reboque');
    })
})
app.get('/mostrar_reboque', async (req,res)=>{
    let imprime_db = await Reboque.findAll();
    res.render('mostrar_reboque',{imprime_db})
})
app.get('/deletar_reboque/:id', (req,res)=>{
    Reboque.destroy({
        where: {'id': req.params.id}
    }).then(()=>{
        console.log("Reboque excluido com sucesso!")
        res.redirect('/mostrar_reboque')
    }).catch((err)=>{
        console.log(`erro ao excluir Reboque ${err}`)
        res.redirect('/mostrar_reboque')
    })
})
app.get('/editar_reboque/:id', async (req,res)=>{
    //let meu_id = req.params.id
    let reboque = await Reboque.findOne({
        where: {id: req.params.id}
    })
    res.render('editar_reboque', reboque)
})
app.post('/editar_reboque', (req,res)=>{
    Reboque.update({
        modelo: req.body.modelo,
        placa: req.body.placa,
        cor: req.body.cor,
        valor: req.body.valor
    },{
        where: {id: req.body.id}
    }).then(()=>{
        console.log("Reboque alterado.")
        res.redirect('/mostrar_reboque')
    }).catch((err)=>{
        console.log(err)
    })
    
})




app.get('/cadastrar_usuario', (req,res)=>{
    res.render('cadastrar_usuario');
})
app.post('/cadastrar_usuario', (req,res)=>{
    Usuario.create({
        usuario: req.body.usuario,
        senha: req.body.senha
    }).then(()=>{
        console.log(`usuario salvo com sucesso`)
        res.render('cadastrar_usuario', {msgErro: "Usuario salvo."})
    }).catch((erro)=>{
        console.log(`erro ao inserir no banco: ${erro}`)
        res.render('cadastrar_usuario')
    })
})
app.get('/logar_usuario', (req,res)=>{
    res.render('logar_usuario');
})
app.post('/logar_usuario', async (req,res)=>{
    let candidato = await Usuario.findOne({where: {usuario: req.body.usuario}});
    let encontrou_usuario = false

   if(candidato == null){
        encontrou_usuario = false;
   } else {
        if(req.body.senha == candidato.senha){
            var usuario_nome = "Olá, "+candidato.usuario;
            encontrou_usuario = true;
        }
   }
    
    if(encontrou_usuario){
        let imprime_db = await Reboque.findAll();
        res.render('mostrar_reboque', {usuario_nome, imprime_db })
    } else {
        res.render('logar_usuario', {msgErro: "Usuário ou senha invalidos."})
    }

})


app.listen(port, () => {
    console.log(`Access http://localhost${port}`);
})









