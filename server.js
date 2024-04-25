import express from 'express'
import bodyParser from 'body-parser'
import Router from './routes.js'
import './models/mongo.js'
import session from 'express-session'

const app = express()
const port = 5000
const secret = 'qsdjS12ozn78ehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

app.set('views', './views') 
app.set('view engine', 'ejs')

//configuration du middleware de session pour acceder aux sessions des utilisateurs
app.use(session({secret, resave: false, saveUninitialized: false }));

app.use('/public', express.static('public'))

app.use(bodyParser.json()) // On parse du json 
app.use(bodyParser.urlencoded({ extended: true })) //on encode l'url
app.use('/', Router)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

console.log(new Date().toLocaleString());