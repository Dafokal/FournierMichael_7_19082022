
const fs = require('fs');
const Publication = require('../models/Publication');
const User = require('../models/User');

// Creates a publication from data
exports.createPublication = (req, res, next) => {
    const publicationObject = req.body;
    delete publicationObject._id;
    const publication = new Publication({
        ...publicationObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        date: Date.now()
    });
    req.file ? publication['imageUrl'] = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
    publication.save()
        .then(() => res.status(201).json({ message: 'Ressource enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

// Get a publication from id
exports.getOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => res.status(200).json(publication))
        .catch(error => res.status(404).json({ error }));
}

// Modify a publication from id and data
exports.modifyPublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => {
            const previousFilename = publication.imageUrl ? publication.imageUrl.split('/images/')[1] : undefined;
            const publicationObject = req.file? {
                text: req.body.text,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { text: req.body.text };
            Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
                .then(() => {
                    if (previousFilename && req.file) {
                        fs.unlink(`images/${previousFilename}`, () => { });
                    }
                    res.status(200).json({message: 'Ressource modifiée !' })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};

// Delete a publication from id
exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => {
            if (publication.imageUrl) {
                const filename = publication.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { });
            }
            Publication.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Ressource supprimée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Get all publications in database
exports.getAllPublications = (req, res, next) => {
    Publication.find()
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(404).json({ error }));
}

// Update the like value & the list of users that likes/dislikes the publication
exports.likePublication = (req, res, next) => {
    User.findOne({ _id: req.body.userId })
    .then(() => {
        Publication.findOne({ _id: req.params.id })
        .then(publication => {
            for (index in publication.usersLiked) {
                if (req.body.userId === publication.usersLiked[index]) {
                    publication.usersLiked.splice(index, 1);
                    publication.likes -= 1;
                }
            }
            for (index in publication.usersDisliked) {
                if (req.body.userId === publication.usersDisliked[index]) {
                    publication.usersDisliked.splice(index, 1);
                    publication.dislikes -= 1;
                }
            }
            switch (req.body.like) {
                case 1:
                    publication.usersLiked.push(req.body.userId);
                    publication.likes += 1;
                    break;
                case -1:
                    publication.usersDisliked.push(req.body.userId);
                    publication.dislikes += 1;
                    break;
                case 0:
                    break;
                default:
                    res.status(400).json({ message: 'Valeur de like invalide.' })
                    return
            }
            Publication.updateOne({ _id: req.params.id }, { publication, _id: req.params.id, usersLiked: publication.usersLiked, usersDisliked: publication.usersDisliked, likes: publication.likes, dislikes: publication.dislikes})
                .then(() => res.status(200).json({ message: 'Ressource mise à jour !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}