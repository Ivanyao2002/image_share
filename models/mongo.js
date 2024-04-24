import mongoose from 'mongoose'
import { createHash } from 'crypto'
import jwt from 'jsonwebtoken';
import schemas from './schemas.js'

const db = 'mongodb://127.0.0.1:27017/shared' 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const {photoSchema, commentSchema, userSchema} = schemas

mongoose.connect(db).then(() => console.log('Mongodb Connected'))

userSchema.statics.findByCredentials = async function (email) {
    return this.findOne({ email});
};

// Générer un jeton d'authentification (token) en utilisant une bibliothèque de génération de jetons comme jsonwebtoken
userSchema.methods.generateAuthToken = async function () {
      
    const token = jwt.sign({ _id: this._id }, 'secret_key');
    // "secret_key" devrait être remplacé par votre clé secrète réelle utilisée pour signer le jeton
  
    return token;
  };
  
// Création des modèles
const User = mongoose.model('User', userSchema);
const Photo = mongoose.model('Photo', photoSchema);
const Comment = mongoose.model('Comment', commentSchema);

export default {User, Photo, Comment}