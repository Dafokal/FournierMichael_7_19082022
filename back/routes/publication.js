const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const rights = require('../middleware/rights');
const multer = require('../middleware/multer-config');
const publicationsCtrl = require('../controllers/publication');

// Defines routes for all publications requests
router.get('/', auth, publicationsCtrl.getAllPublications);
router.post('/', auth, multer, publicationsCtrl.createPublication);
router.get('/:id', auth, publicationsCtrl.getOnePublication);
router.put('/:id', auth, rights, multer, publicationsCtrl.modifyPublication);
router.delete('/:id', auth, rights, publicationsCtrl.deletePublication);
router.post('/:id/like', auth, publicationsCtrl.likePublication);

module.exports = router;