import model from '../models/mongo.js';
import { createHash } from 'crypto'

const {User} = model

const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const safePwd = createHash('sha512').update(password).digest('base64')
      const avatar = req.file ? req.file.filename : null; // On recupère le nom du fichier de l'image ou null s'il n'y a pas d'image
      const user = new User({ username, email, password:safePwd , avatar}); // On cree une instance du modèle User
      await user.save();
      res.status(201).json(`User created : ${user}`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const safePwd = createHash('sha512').update(password).digest('base64')
      const user = await User.findByCredentials(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = await user.generateAuthToken();
      res.json({ user, token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}; 
/*exports.postLogin = (req, res) => {
  console.log('login post', req.body);
  if (!req.body) {
      return res.sendStatus(500);
  } else {        
      if(fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
          // iss means 'issuer'
          const myToken = jwt.sign({iss: 'http://expressmovies.fr', user: 'Sam', role: 'moderator'}, secret);
          console.log('myToken', myToken);
          res.json(myToken);
      } else {
          res.sendStatus(401);
      } 
  } 
};*/

/*const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};*/

const getLogin = (req, res) => {
  res.render('login', { title: 'Espace membre'});
};

const getRegister = (req, res) => {
  res.render('register', { title: 'Espace membre'});
};


export default {
  register, login, getLogin, getRegister
};
// (getUser, updateUser, deleteUser)
