import model from '../models/mongo.js';

const {Photo} = model

const getAllPhotos = (req, res) => {
    res.render('pictures');
};

const addPhoto = (req, res) => {
    const {title} = req.body
    const imageUrl = "/uploads/" + req.file ? req.file.filename : null;
    const userId = req.session.user ? req.session.user._id : null; // On recupère l'utilisateur connecté pour l'associé à l'enregistrement 
    const newImage = new Photo({title, imageUrl, user: userId})

    newImage.save()
    .then(image => res.status(201).json("New image added"))
    .catch(error => res.status(500).json({ message: error }));
};


export default {
    getAllPhotos, addPhoto
};