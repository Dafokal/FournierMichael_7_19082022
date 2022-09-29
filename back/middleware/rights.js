const Publication = require('../models/Publication');

module.exports = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => {
            if (req.auth.userId !== publication.userId) {
                throw 'Invalid user ID';
            } else {
                next();
            }
        })
        .catch(error => res.status(403).json({ error }));
  };