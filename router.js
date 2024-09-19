const express = require('express');

const router = express.Router();

const auth = require('./auth');     
router.use(auth.verifyToken)

const tattooArtistController = require('./controllers/TattooArtistController');
const categoryController = require('./controllers/CategoryController');
const quoteController = require('./controllers/QuoteController');
const userController = require('./controllers/UserController');
const authController = require('./controllers/AuthController');


router.get('/tattoo-artist', tattooArtistController.getTattooArtistList);
router.get('/tattoo-artist/:id', tattooArtistController.getTattooArtistDetail);
router.get('/tattoo-artist/categories/:id', tattooArtistController.getTattooArtistListByCategory);
router.post('/tattoo-artist/new', tattooArtistController.createTattooArtist);

router.get('/categories/:id', categoryController.getCategory);
router.post('/categories/new', categoryController.createCategory);
router.get('/categories', categoryController.listCategories);

router.get('/quotes/:id', quoteController.getQuote);
router.post('/quotes/new', quoteController.createQuote);
router.get('/quotes/user/:id', quoteController.listQuotesByUser);
router.get('/quotes/tattoo-artist/:id', quoteController.listQuotesByTattooArtist);
router.put('/quotes/approve', quoteController.approveQuote);

router.post('/users/new', userController.createUser);
router.get('/users', userController.getUserList);

router.post('/login/tattoo-artist', authController.loginTattooArtist);
router.post('/login/user', authController.loginUser);



module.exports = router;