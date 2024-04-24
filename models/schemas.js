import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Schéma Utilisateur
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now }
  }, {collection: 'users'});

  
  // Schéma Photo
  const photoSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, {collection: 'photos'});

  
  // Schéma Commentaire
  const commentSchema = new Schema({
    contenu: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    photo: { type: Schema.Types.ObjectId, ref: 'Photo', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }, {collection: 'comments'});


  export default {userSchema, photoSchema, commentSchema}