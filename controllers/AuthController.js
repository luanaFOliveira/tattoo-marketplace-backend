const UserModel = require('../models/User');
const TattoArtistModel = require('../models/TattooArtist');

const loginUser = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }
  
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      
      if (!passwordMatch) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN", 
        { expiresIn: "24h" }
      );
  
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred during login", error: error.message });
    }
};


const loginTattooArtist = async (req, res) => {
    try {
        const tattooArtist = await TattoArtistModel.findOne({ email: req.body.email });
        
        if (!tattooArtist) {
          return res.status(404).json({ message: "Email not found" });
        }
    
        const passwordMatch = await bcrypt.compare(req.body.password, tattooArtist.password);
        
        if (!passwordMatch) {
          return res.status(400).json({ message: "Passwords do not match" });
        }
    
        const token = jwt.sign(
          {
            tattooArtistId: tattooArtist._id,
            tattooArtistEmail: tattooArtist.email,
          },
          "RANDOM-TOKEN", 
          { expiresIn: "24h" }
        );
    
        res.status(200).json({
          message: "Login successful",
          tattooArtist: {
            id: tattooArtist._id,
            email: tattooArtist.email,
            name: tattooArtist.name,
          },
          token,
        });
      } catch (error) {
        res.status(500).json({ message: "An error occurred during login", error: error.message });
      }
};

module.exports = {
    loginUser,
    loginTattooArtist
};