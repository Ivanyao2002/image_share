import express from 'express';
import bodyParser from 'body-parser';
import Router from './routes.js';
import model from './models/mongo.js';
import './models/mongo.js';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const {User} = model;

const app = express();
const port = 5000;

app.set('views', './views') ;
app.set('view engine', 'ejs');

//configuration du middleware de session pour acceder aux sessions des utilisateurs (les données de la session sont enregistrer au niveau du server et renvoyé dans les requette http à travers les cookies(stocke l'id de la session) )
app.use(session({
  name: process.env.SESSION_NAME, // Nom de la session (sessionId)
  secret: process.env.SESSION_SECRET, // Permet de signer les cookies qui permet d'identifier les sesions
  resave: false, // Pour dire que la sesion n'a pas encore été modifié lors de la requette 
  saveUninitialized: false, // Le stockage de la session n'est pas encore initialisé
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Le temps de delimitation du cookie au niveau du navigateur sur 1 semaine
    sameSite: true, 
    secure: false, // Lorsque nous sommes en production
  },
}));

// S'execute avant toutes les autres routes pour sauvegarder l'utilisateur dans une memoire tampon
app.use(async (req, res, next) => {
  const { id_user } = req.session; // On recupère l'id de l'utilisateur à partir de la session
  if (id_user) { // Si il existe, on recupère les infos de l'utilisateur de la BD
    try {
      const user = await User.findOne({ _id: id_user }); // On recherche l'utilisateur correspondant à l'ID de session
      res.locals.user = user // On sauvegarde dans local toutes les infos à utilisé plutard 
    } catch (err) {
      // Si on ne retrouve pas l'utilisateur
      console.error(err);
    };
  }
  next(); // Si l'utilisateur n'est pas chargé on passe au prochain middleware 
});

// Middleware d'erreur personnalisé
app.use((req, res, next) => {
  res.locals.errors = req.session.errors || {}; // Stocker les erreurs dans res.locals pour les rendre disponibles dans les vues
  req.session.errors = {}; // Réinitialiser les erreurs dans la session
  next();
});

app.use('/public', express.static('public'));

app.use(bodyParser.json()); // On parse du json 
app.use(bodyParser.urlencoded({ extended: true })); //on encode l'url
app.use('/', Router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});