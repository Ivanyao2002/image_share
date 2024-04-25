import model from '../models/mongo.js';
import { createHash } from 'crypto'
import { validationResult, body } from 'express-validator';

const {User} = model

const secretKey = 'qsdjS12ozn78ehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq'; //clé secrète utilisée pour signer le jeton

// Règles de validation pour chaque champ du formulaire
const bodyValidator = [
    body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis'),
    body('email').notEmpty().withMessage('L\'adresse e-mail est requise').isEmail().withMessage('L\'adresse e-mail n\'est pas valide'),
    body('password').notEmpty().withMessage('Le mot de passe est requis').isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères')
]

// Middleware pour securisé les routes avec verification du token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization; // Récupérez le jeton d'authentification de l'en-tête de la requête

  if (!token) {
    return res.status(401).json({ message: 'Vous n\'etes pas autorisé à acceder à cette route !' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Vérifiez et décodez le jeton

    // Ajoutez les informations de l'utilisateur décodées à la demande pour une utilisation ultérieure
    req.user = decoded;

    next(); // Passez à la prochaine fonction de middleware
  } catch (err) {
    return res.status(401).json({ message: 'Votre token est invalide !' });
  }
};

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // Si Il y a des erreurs de validation
      const errorMessages = errors.array().map(err => err.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    try { // Si le formulaire est valide
      const { username, email, password } = req.body;
      const safePwd = createHash('sha512').update(password).digest('base64')
      const avatar = "/uploads/" + req.file ? req.file.filename : null; // On recupère le nom du fichier de l'image ou null s'il n'y a pas d'image et on stocke dans le dossier 
      const user = new User({ username, email, password:safePwd , avatar}); // On cree une instance du modèle User
      await user.save();
      res.redirect('/photos');
      //res.status(201).json(`User created : ${user}`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const safePwd = createHash('sha512').update(password).digest('base64')
      const user = await User.findByCredentials(username, safePwd);
      if (!user) {
        return res.status(401).json({ message: 'Idebtifiants invalides !!' });
      }
      const token = await user.generateAuthToken();
      // On Stocke le token et l'utilisateur dans la session 
      req.session.token = token;
      req.session.user = user;
        //res.json({ user, token });
      res.redirect('/photos');
    } catch (err) {
      res.status(400).json({ message: err.message });
    }  
}; 


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
  register, login, getLogin, getRegister, bodyValidator, authMiddleware
};
// (getUser, updateUser, deleteUser)
