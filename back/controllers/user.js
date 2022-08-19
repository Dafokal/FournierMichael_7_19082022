const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFsDpv+piLrkU7ZPNzky5tRS3nnXTPE8oe8uNEeIqaL/Y9rZOgMUWhMs0v91xtOfnra/8ym2t5N1fGqZS2bFXCvfj2ByqIXNMf/uNxlfgsa/joEBCIXo8sltDxjPTzFaMcvYKBKY88EtWFO6T6Hehmm+OaS+7/5NzEAyvkkH7JA3AgMBAAE=',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
            })
        .catch(error => res.status(500).json({ error }));
};