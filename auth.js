const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Obtenha o token do cabeçalho

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    const decoded = jwt.verify(token, "RANDOM-TOKEN"); // Verifique o token com sua chave secreta
    req.user = decoded; // Armazene o usuário decodificado na requisição
    next(); // Continue para o próximo middleware/rota
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      userEmail: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = { verifyToken, generateToken };

