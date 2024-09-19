const bcrypt = require('bcrypt');
const TattoArtistModel = require("../models/TattooArtist");

const getTattooArtistList = async (req, res) => {
    try {
        const list = await TattoArtistModel.find();
        res.send(list);  
    } catch (err) {
        res.send(err);
    }
};

const getTattooArtistListByCategory = async (req, res) => {
    const query = require('url').parse(req.url, true).query;
    const category_id = query.id;
    try {
        const list = await TattoArtistModel.find({ category: category_id });
        res.send(list);  
    } catch (err) {
        res.send(err);
    }
};

const getTattooArtistDetail = async (req, res) => {
    const query = require('url').parse(req.url, true).query;
    const id = query.id;

    try {
        const tattooArtist = await TattoArtistModel.find({ _id: id }).populate('category');
        res.send(tattooArtist);
    } catch (err) {
        res.send(err);
    }
};

const getTattooArtist = async (req, res) => {
    const query = require('url').parse(req.url, true).query;
    const id = query.id;

    try {
        const tattooArtist = await TattoArtistModel.find({ "_id": id });
        res.send(tattooArtist);
    } catch (err) {
        res.send(err);
    }
};

const createTattooArtist = async (req, res) => {
    try {
        const { password, name, age, city, email, category, profile_img, images } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const tattooArtist = new TattoArtistModel({
            name,
            age,
            city,
            email,
            password: hashedPassword,
            category,
            profile_img,
            images
        });

        await tattooArtist.save();

        console.log(tattooArtist);
        res.status(201).send(tattooArtist);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Erro ao criar tatuador' });
    }
};

module.exports = {
    getTattooArtistList,
    getTattooArtistListByCategory,
    getTattooArtistDetail,
    getTattooArtist,
    createTattooArtist
};
