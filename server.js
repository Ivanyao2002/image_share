import express from 'express'
import bodyParser from 'body-parser'
import Router from './routes.js'
import './mongo.js'

const app = express()
const port = 5000

app.use(bodyParser.json()) // On parse du json 
app.use(bodyParser.urlencoded({ extended: true })) //on encode l'url
app.use('/api', Router)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})