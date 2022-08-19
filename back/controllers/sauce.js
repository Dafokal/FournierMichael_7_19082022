
const fs = require('fs');
const Sauce = require('../models/Sauce');
const User = require('../models/User');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Ressource enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const previousFilename = sauce.imageUrl.split('/images/')[1];
            const sauceObject = req.file? {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
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

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Ressource supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
}

exports.likeSauce = (req, res, next) => {
    User.findOne({ _id: req.body.userId })
    .then(() => {
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            switch (req.body.like) {
                case 1:
                    sauce.usersLiked.push(req.body.userId);
                    sauce.likes += 1;
                    break;
                case 0:
                    for (index in sauce.usersLiked) {
                        if (req.body.userId === sauce.usersLiked[index]) {
                            sauce.usersLiked.splice(index, 1);
                            sauce.likes -= 1;
                        }
                    }
                    for (index in sauce.usersDisliked) {
                        if (req.body.userId === sauce.usersDisliked[index]) {
                            sauce.usersDisliked.splice(index, 1);
                            sauce.dislikes -= 1;
                        }
                    }
                    break;
                case -1:
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes += 1;
                    break;
                default:
                    res.status(400).json({ message: 'Valeur de like invalide.' })
            }
            Sauce.updateOne({ _id: req.params.id }, { sauce, _id: req.params.id, usersLiked: sauce.usersLiked, usersDisliked: sauce.usersDisliked, likes: sauce.likes, dislikes: sauce.dislikes})
                .then(() => res.status(200).json({ message: 'Ressource mise à jour !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}