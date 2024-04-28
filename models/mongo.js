import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import schemas from './schemas.js'
import dotenv from 'dotenv';
dotenv.config();

const db = 'mongodb://127.0.0.1:27017/shared' 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const {photoSchema, commentSchema, userSchema} = schemas

const secret =  process.env.SESSION_SECRET; //clé secrète utilisée pour signer le jeton

mongoose.connect(db).then(() => console.log('Connexion reussie à la base de données !')).catch(() => console.log("Erreur de connexion à la base de données !"))

// Méthode static pour comparer les informations saisir et ceux de la BD
userSchema.statics.findByCredentials = async function (username, password) {
    const user = await this.findOne({ username});
 
    if (!user) {
        return null; // Utilisateur non trouvé
    }
    
    if (user.password === password) {
      return user; // Mot de passe correct, retourne le user
    }
    return null; // Utilisateur non trouvé avec des informations d'identification invalides
};

// Générer un jeton d'authentification (token) en utilisant une bibliothèque de génération de jetons comme jsonwebtoken
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id, username: this.username }, secret); // { expiresIn: '1h' }
    return token;
};
  
// Création des modèles
const User = mongoose.model('User', userSchema);
const Photo = mongoose.model('Photo', photoSchema);
const Comment = mongoose.model('Comment', commentSchema);

export default {User, Photo, Comment}