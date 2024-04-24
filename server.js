import express from 'express'
import bodyParser from 'body-parser'
import Router from './routes.js'
import './models/mongo.js'

const app = express()
const port = 5000

app.set('views', './views') 
app.set('view engine', 'ejs')

app.use(bodyParser.json()) // On parse du json 
app.use(bodyParser.urlencoded({ extended: true })) //on encode l'url
app.use('/', Router)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})