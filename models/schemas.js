import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
  title: { type: String, required: true },
  //description: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  comments: [{
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
}, {collection: 'photos'});

export default {userSchema, photoSchema};