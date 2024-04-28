import model from '../models/mongo.js';

const {Photo} = model

const getAllPhotos = (req, res) => {
    console.log(req.session);
    const { user } = res.locals; // On recupère depuis local l'utilisateur
    res.render('pictures', {user});
};

const addPhoto = (req, res) => {
    const {title} = req.body
    const imageUrl = "/uploads/" + req.file ? req.file.filename : null;
    const userId = req.session ? req.session.id_user : null; // On recupère l'utilisateur connecté pour l'associé à l'enregistrement 
    
    if (!userId) {
        return res.status(401).json({ message: 'Utilisateur non connecté' });
    }
    
    const newImage = new Photo({title, imageUrl, user: userId})

    newImage.save()
    //.then(image => res.status(201).json("New image added"))
    //.catch(error => res.status(500).json({ message: error }));
    .then(image => res.render('pictures', {image}))
    .catch(error => res.status(500).json({ message: error }));
};


export default {
    getAllPhotos, addPhoto
};