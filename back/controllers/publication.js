
const fs = require('fs');
const Publication = require('../models/Publication');
const User = require('../models/User');

exports.createPublication = (req, res, next) => {
    console.log(req.body);
    const publicationObject = req.body;
    delete publicationObject._id;
    const publication = new Publication({
        ...publicationObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    publication.save()
        .then(() => res.status(201).json({ message: 'Ressource enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => res.status(200).json(publication))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyPublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => {
            const previousFilename = publication.imageUrl.split('/images/')[1];
            const publicationObject = req.file? {
                ...JSON.parse(req.body.publication),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };
            Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
                .then(() => {
                    if (req.file) {
                        fs.unlink(`images/${previousFilename}`, () => { });
                    }
                    res.status(200).json({message: 'Ressource modifiée !' })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};

exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => {
            const filename = publication.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Publication.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Ressource supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllPublications = (req, res, next) => {
    Publication.find()
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(404).json({ error }));
}

exports.likePublication = (req, res, next) => {
    User.findOne({ _id: req.body.userId })
    .then(() => {
        Publication.findOne({ _id: req.params.id })
        .then(publication => {
            switch (req.body.like) {
                case 1:
                    publication.usersLiked.push(req.body.userId);
                    publication.likes += 1;
                    break;
                case 0:
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
                    break;
                case -1:
                    publication.usersDisliked.push(req.body.userId);
                    publication.dislikes += 1;
                    break;
                default:
                    res.status(400).json({ message: 'Valeur de like invalide.' })
            }
            Publication.updateOne({ _id: req.params.id }, { publication, _id: req.params.id, usersLiked: publication.usersLiked, usersDisliked: publication.usersDisliked, likes: publication.likes, dislikes: publication.dislikes})
                .then(() => res.status(200).json({ message: 'Ressource mise à jour !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}