import express from 'express'
import multer from 'multer'
import userController from './controllers/userController.js';
import photoController from './controllers/photoController.js';
import commentController from './controllers/commentController.js';

const Router = express.Router()
const {register, login, getLogin, getRegister} = userController
const upload = multer({
    dest: 'uploads/', // Répertoire de destination pour les fichiers téléchargés
  });

Router.get('/', (req, res) => {
    res.render('index')
})

// Routes pour les utilisateurs
Router.post('/register',upload.single('avatar'), register);
Router.post('/login', login);
Router.get('/login', getLogin)
Router.get('/register', getRegister)
/*
Router.get('/users', userController.getAllUsers);
Router.get('/users/:id', userController.getUser);
Router.put('/users/:id', userController.updateUser);
Router.delete('/users/:id', userController.deleteUser);

// Routes pour les photos
Router.post('/photos', photoController.createPhoto); 
Router.get('/photos', photoController.getAllPhotos);
Router.get('/photos/:id', photoController.getPhoto);
Router.put('/photos/:id', photoController.updatePhoto);
Router.delete('/photos/:id', photoController.deletePhoto);

// Routes pour les commentaires
Router.post('/photos/:photoId/comments', commentController.createComment);
Router.get('/photos/:photoId/comments', commentController.getComments);
Router.put('/comments/:id', commentController.updateComment);
Router.delete('/comments/:id', commentController.deleteComment);*/

export default Router;