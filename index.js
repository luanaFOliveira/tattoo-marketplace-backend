const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require("cookie-session");
const app = express();
/* const FoodModel = require("./models/Food");
const UserModel = require("./models/Usuario");
const TatuadorModel = require("./models/Tatuador");
const OrcamentoModel = require("./models/Orcamento");
const CategoriaModel = require("./models/Categoria"); */

require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const router = require('./router');

app.use(cors());

app.use(express.json());
app.use(router);
app.use(
    cookieSession({
      name: "luana-session",
      secret: "COOKIE_SECRET", // should use as secret environment variable
      httpOnly: true
    })
);

mongoose.connect("mongodb+srv://user2:senha@cluster0.kqt2v3y.mongodb.net/crudTest?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
});


app.post('/userform/insert', async (req,res) =>{
    
    bcrypt.hash(req.body.senha, 10)
        .then(async (hashedPassword) => {
   
            const nome = req.body.name;
            const email = req.body.email;
            const user = new UserModel({name:nome,email:email,senha:hashedPassword});
            try{
                await user.save();
                console.log(user);
            }catch(err){
                console.log(err);
            }
        });
        

});


app.post('/tatuadorform/insert', async (req,res) =>{
    
    bcrypt.hash(req.body.senha, 10)
        .then(async (hashedPassword) => {             
            const nome = req.body.name;
            const idade = req.body.age;
            const cidade = req.body.city;
            const email = req.body.email;
            const categoria = req.body.categoria;
            const perfil = req.body.foto_perfil;
            const exemplo1 = req.body.foto_exemplo1;
            const exemplo2 = req.body.foto_exemplo2;
            const exemplo3 = req.body.foto_exemplo3;
            const exemplo4 = req.body.foto_exemplo4;
            const tatuador = new TatuadorModel({name:nome,age:idade,city:cidade,email:email,senha:hashedPassword,categoria:categoria,foto_perfil:perfil,foto_exemplo1:exemplo1,foto_exemplo2:exemplo2,foto_exemplo3:exemplo3,foto_exemplo4:exemplo4});
            try{
                await tatuador.save();
                console.log(tatuador);
            }catch(err){
                console.log(err);
            }
        });
        
});

app.post('/login/cliente', async (req,res) =>{
    //var query = require('url').parse(req.url,true).query;
    //const nome = query.categoriaName;
    await UserModel.findOne({ email: req.body.email })
        .then(user=>{
            bcrypt.compare(req.body.senha, user.senha)
            .then((passwordCheck) => {
                // check if password matches
                console.log(user);
                if(!passwordCheck) {
                  return res.status(400).send({
                    message: "Passwords does not match",
                    error,
                  });
                }
                 //   create JWT token
                const token = jwt.sign(
                    {
                    userId: user._id,
                    userEmail: user.email,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                );
                //   return success response
                res.send(user);
                /*
                res.status(200).send({
                    message: "Login Successful",
                    name: user.name,
                    token,
                });
                */
            })
            .catch((error) => {
                res.status(400).send({
                message: "Passwords does not match",
                error,
                });
            })
        })
        // catch error if email does not exist
        .catch((e) => {
            res.status(404).send({
            message: "Email not found",
            e,
            });
        });

});


app.post('/login/tatuador', async (req,res) =>{
    //var query = require('url').parse(req.url,true).query;
    //const nome = query.categoriaName;
    await TatuadorModel.findOne({ email: req.body.email })
        .then(user=>{
            bcrypt.compare(req.body.senha, user.senha)
            .then((passwordCheck) => {
                // check if password matches
                console.log(user);
                if(!passwordCheck) {
                  return res.status(400).send({
                    message: "Passwords does not match",
                    error,
                  });
                }
                 //   create JWT token
                const token = jwt.sign(
                    {
                    userId: user._id,
                    userEmail: user.email,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                );
                //   return success response
                res.send(user);
                /*
                res.status(200).send({
                    message: "Login Successful",
                    name: user.name,
                    token,
                });
                */
            })
            .catch((error) => {
                res.status(400).send({
                message: "Passwords does not match",
                error,
                });
            })
        })
        // catch error if email does not exist
        .catch((e) => {
            res.status(404).send({
            message: "Email not found",
            e,
            });
        });

});

// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
  
// authentication endpoint
app.get("/auth-endpoint",auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});


app.post('/cadastroUsuario', async (req,res) =>{
    const email = req.body.name;
    const senha = req.body.senha;
    const user = new UserModel({name:nome,age:idade,email:email,senha:senha});
    try{
        await user.save();
        console.log(user);
    }catch(err){
        console.log(err);
    }

});


/*
app.post('/login', async (req,res) =>{
    const email = req.body.name;
    const senha = req.body.senha;

    UserModel.findOne({
        username: req.body.username,
      })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
          }
    
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });
    
          req.session.token = token;
    
          res.status(200).send({
            email: user.email,
          });
        });
       
});

app.post('/cadastroUsuario', async (req,res) =>{
    const email = req.body.name;
    const senha = req.body.senha;
    const user = new UserModel({name:nome,age:idade,email:email,senha:senha});
    try{
        await user.save();
        console.log(user);
    }catch(err){
        console.log(err);
    }

});


app.post('/logout', async (req,res) =>{
    const email = req.body.name;
    const senha = req.body.senha;
    const user = new UserModel({name:nome,age:idade,email:email,senha:senha});
    try{
        await user.save();
        console.log(user);
    }catch(err){
        console.log(err);
    }

});
*/

app.get('/userlist',async (req,res)=>{
    try{
        const resultado = await UserModel.find();
        res.send(resultado);
    }catch(err){
        res.send(err);
    }
});


app.get('/tatuadorlist',async (req,res)=>{
    try{
        const resultado = await TatuadorModel.find();
        res.send(resultado);
    }catch(err){
        res.send(err);
    }
});

app.get('/categorialist',async (req,res)=>{
    try{
        const resultado = await CategoriaModel.find();
        res.send(resultado);
    }catch(err){
        res.send(err);
    }
});

/*
//faz a requisicao uma vez e guarda a info 
app.get('/tatuador',async (req, res, next)=>{
    const nome = req.params.name;

    try{
        const resultado = await TatuadorModel.find({name: nome}, function (err, docs) {
            res.json({length: docs.length, records: docs});
        });        
        res.send(resultado);
    }catch(err){
        res.send(err);
    }

});
*/

/*
app.post('/userform/insert', async (req,res) =>{
    const nome = req.body.name;
    const idade = req.body.age;
    const email = req.body.email;
    const senha = req.body.senha;
    const user = new UserModel({name:nome,age:idade,email:email,senha:senha});
    try{
        await user.save();
        console.log(user);
    }catch(err){
        console.log(err);
    }

});

app.post('/tatuadorform/insert', async (req,res) =>{
    const nome = req.body.name;
    const idade = req.body.age;
    const cidade = req.body.city;
    const email = req.body.email;
    const senha = req.body.senha;
    const categoria = req.body.categoria;
    const perfil = req.body.foto_perfil;
    const exemplo1 = req.body.foto_exemplo1;
    const exemplo2 = req.body.foto_exemplo2;
    const exemplo3 = req.body.foto_exemplo3;
    const exemplo4 = req.body.foto_exemplo4;

    const user = new TatuadorModel({name:nome,age:idade,city:cidade,email:email,senha:senha,categoria:categoria,foto_perfil:perfil,foto_exemplo1:exemplo1,foto_exemplo2:exemplo2,foto_exemplo3:exemplo3,foto_exemplo4:exemplo4});
    try{
        await user.save();
        console.log(user);
    }catch(err){
        console.log(err);
    }

});
*/


app.post('/orcamento/insert', async (req,res) =>{
    const clientEmail = req.body.clientEmail;
    const tatuadorEmail = req.body.tatuadorEmail;
    const descricao = req.body.descricao;
    const inspiracao = req.body.inspiracao;
    const tamanho = req.body.tamanho;
    const local = req.body.local;
    const cor = req.body.cor;
    const status = req.body.status

    const user = new OrcamentoModel({tatuador_email:tatuadorEmail,descricao:descricao,inspiracao:inspiracao,tamanho:tamanho,local:local,cor:cor,cliente_email:clientEmail,status:status});
    try{
        await user.save();
        console.log(user);
    }catch(err){
        console.log(err);
    }

});


function createCategorias(){
    const map = new Map();
    map.set('1',"Black Work","https://i.pinimg.com/originals/61/3a/66/613a666a9d308f1605b522bbf52b8a0d.jpg");
    map.set('2',"Old School","https://www.fashionbubbles.com/files/2017/05/tatuagens-old-school-3-600x389.jpg");
    map.set('3',"Fine Line","https://boadicadebeleza.com.br/wp-content/uploads/2023/01/fineline-tattoo.jpeg");
    map.set('4',"Pontilhismo","https://blog.pajaris.com.br/wp-content/uploads/2020/06/Tatuagem-pontilhismo-_0002_Camada-39.jpg");
    map.set('5',"Geometrica","https://fotostatuagens.com/wp-content/uploads/2018/04/fechado.jpg");
    map.set('6',"Oriental","https://cdntattoofilter.com/tattoo/22329/l.jpg");
    map.set('7',"Realista","https://amotatuagem.com/wp-content/uploads/2018/06/tatuagens-realistas-2.jpg");
    map.set('8',"Maori","https://www.elhombre.com.br/wp-content/uploads/2019/03/449c935c-49ce-681a-b4fe-5aaf3e01b0b5-600x594.jpg");
    map.set('9',"Aquarela","https://i2.wp.com/www.depoisdosquinze.com/app/uploads/2014/04/tatuagens-aquarela-02.jpg?resize=700%2C700&ssl=1");
    map.set('10',"Minimalista","https://i.pinimg.com/originals/0c/09/93/0c09930be705d58f3db5da783c92437f.png");

}


app.post('/categoria/insert', async (req,res) =>{
    
    const name = req.body.name;
    const img = req.body.img;

    const categ = new CategoriaModel({name:name,img:img});
    try{
        await categ.save();
        console.log(user);
    }catch(err){
        console.log(err);
    }

});


app.get('/orcamento',async (req,res)=>{
    var query = require('url').parse(req.url,true).query;
    const idOrcamento = query.idOrcamento;

    try{
        const resultado = await OrcamentoModel.find({_id: idOrcamento});   
        res.send(resultado);
    }catch(err){
        res.send(err);
    }

});

app.get('/categoria', async(req,res)=>{
    
    var query = require('url').parse(req.url,true).query;
    const nome = query.categoriaName;

    try{
        const resultado = await TatuadorModel.find({"categoria": nome});   
        res.send(resultado);
    }catch(err){
        res.send(err);
    }

});


app.get('/orcamentosTatuador', async(req,res)=>{
    
    var query = require('url').parse(req.url,true).query;
    const email = query.tatuadorEmail;

    try{
        const resultado = await OrcamentoModel.find({"tatuador_email": email});   
        res.send(resultado);
    }catch(err){
        res.send(err);
    }

});


app.get('/orcamentosCliente', async(req,res)=>{
    
    var query = require('url').parse(req.url,true).query;
    const email = query.userEmail;

    try{
        const resultado = await OrcamentoModel.find({"cliente_email": email});  
        console.log(resultado); 
        res.send(resultado);
    }catch(err){
        res.send(err);
    }

});

app.post('/orcamentoAprovado', async(req,res)=>{
    
    const preco = req.body.preco;
    const status = req.body.status;
    const idOrcamento = req.body.idOrcamento;

    try{
        const resultado = await OrcamentoModel.updateOne({"_id":idOrcamento},{ $set:{"preco":preco,"status":status}});  
        res.send(resultado);
    }catch(err){
        res.send(err);
    }

});


app.get('/tatuador', async(req,res)=>{
    
    var query = require('url').parse(req.url,true).query;
    const email = query.tatuadorEmail;
    
    //console.log(email); 
    try{
        const resultado = await TatuadorModel.find({"email": email});   
        console.log(resultado); 
        res.send(resultado);
    }catch(err){
        res.send(err);
    }

});


const PORT = process.env.PORT || 3001;
app.listen(3001, () => {
  console.log(`Server is running on port ${PORT}`);
});



