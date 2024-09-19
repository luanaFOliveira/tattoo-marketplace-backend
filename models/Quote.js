const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    
    tattoo_artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TattooArtist',
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    inspiration:{
        type:String,
        required:false,
    },
    size:{
        type:Number,
        required:true,
    },
    placement:{
        type:String,
        required:false,
    },
    color:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:false,
    },
    

});

const Quote = mongoose.model("quote",QuoteSchema);
module.exports = Quote;