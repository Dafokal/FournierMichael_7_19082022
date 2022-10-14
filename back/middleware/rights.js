const Publication = require('../models/Publication');

module.exports = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => {
            if (req.auth.userId === publication.userId || req.auth.userId === '6349131bdcc3cb4e5cb24a46') {
                next();
            } else {
                throw 'Invalid user ID';
            }
        })
        .catch(error => res.status(403).json({ error }));
  };