const CategoryModel = require('../models/Category');

const getCategory = async (req, res) => {
    var query = require('url').parse(req.url,true).query;
    const id = query.id;

    try{
        const category = await CategoryModel.find({"_id": id});   
        res.send(category);
    }catch(err){
        res.send(err);
    }
};

const createCategory = async (req, res) => {
    const { name, img } = req.body;
   
    const category = new CategoryModel({name:name,img:img});
    try{
        await category.save();
    }catch(err){
        console.log(err);
    }

};

const listCategories = async (req, res) => {
    try{
        const list = await CategoryModel.find();
        res.send(list);
    }catch(err){
        res.send(err);
    }

};

module.exports = {
    getCategory,
    createCategory,
    listCategories
};

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