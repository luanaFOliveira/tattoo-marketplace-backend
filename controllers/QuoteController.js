const QuoteModel = require('../models/Quote');

const createQuote = async (req, res) => {
    try {
        const { user, tattooArtist, description, inspiration, size, placement, color, status } = req.body;

        const quote = new QuoteModel({
            tattoo_artist: tattooArtist,
            user: user,
            description,
            inspiration,
            size,
            placement,
            color,
            status
        });

        await quote.save();
        return res.status(201).json({
            message: "Quote created successfully",
            quote: {
                tattooArtist: quote.tattoo_artist,
                user: quote.user,
                description: quote.description,
                size: quote.size,
                placement: quote.placement,
                color: quote.color,
                status: quote.status
            }
        });
    } catch (err) {
        console.error("Error creating quote:", err);
        return res.status(500).json({ message: "Error creating quote", error: err.message });
    }
};


const getQuote = async (req, res) => {
    var query = require('url').parse(req.url,true).query;
    const id = query.id;

    try{
        const quote = await QuoteModel.find({_id: id}).populate('tattoo_artist').populate('user');   
        res.send(quote);
    }catch(err){
        res.send(err);
    }
};

const listQuotesByTattooArtist = async (req, res) => {
    var query = require('url').parse(req.url,true).query;
    const id = query.id;

    try{
        const list = await QuoteModel.find({ tattoo_artist: id }).populate('tattoo_artist').populate('user');   
        res.send(list);
    }catch(err){
        res.send(err);
    }
};

const listQuotesByUser = async (req, res) => {
    var query = require('url').parse(req.url,true).query;
    const id = query.id;

    try{
        const list = await QuoteModel.find({ user: id }).populate('tattoo_artist').populate('user');   
        res.send(list);
    }catch(err){
        res.send(err);
    }
};

const approveQuote = async (req, res) => {

    const { price, status, id } = req.body;
   
    try{
        const quote = await QuoteModel.updateOne({"_id":id},{ $set:{"price":price,"status":status}});  
        res.send(quote);
    }catch(err){
        res.send(err);
    }
};

module.exports = {
    createQuote,
    getQuote,
    listQuotesByTattooArtist,
    listQuotesByUser,
    approveQuote
};