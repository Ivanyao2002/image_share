import model from '../models/mongo.js';

const {Photo} = model

const getAllPhotos = async (req, res) => {
    try {
      const { user } = res.locals; // On recupère depuis local l'utilisateur
      const photos = await Photo.find(); // On recupère les photos 
      res.render('pictures', { user, photos });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des photos' });
    } 
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
    //.then(image => res.render('pictures', {image}))
    .then(() => {
        Photo.find()
          .then(photos => res.render('pictures', { photos }))
          .catch(error => res.status(500).json({ message: error }));
      })
    .catch(error => res.status(500).json({ message: error }));
};


export default {
    getAllPhotos, addPhoto
};