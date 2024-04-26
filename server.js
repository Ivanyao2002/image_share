import express from 'express'
import bodyParser from 'body-parser'
import Router from './routes.js'
import './models/mongo.js'
import session from 'express-session'
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = 5000
//const secret = 'qsdjS12ozn78ehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

app.set('views', './views') 
app.set('view engine', 'ejs')

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

app.use('/public', express.static('public'))

app.use(bodyParser.json()) // On parse du json 
app.use(bodyParser.urlencoded({ extended: true })) //on encode l'url
app.use('/', Router)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

console.log(new Date().toLocaleString());