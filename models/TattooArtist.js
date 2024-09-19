const mongoose = require('mongoose');

const TattooArtistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true,
    },
    profile_img:{
        type:String,
        required:true,
    },
    images:{
        type:[String],
        required:false,
    }
    
});

const TattooArtist = mongoose.model("tatto_artist",TattooArtistSchema);
module.exports = TattooArtist;