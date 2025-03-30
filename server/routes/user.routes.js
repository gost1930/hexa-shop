const express = require('express');
const router = express.Router();
const { getUsers,
    getUserById,
    signUp,
    login,
    updateUser,
    virifyToken,
    logout} = require('../controllers/users.controller');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/login', login);
router.post('/signUp', signUp);
router.put('/:id', updateUser);
router.post('/virifyToken', virifyToken);
router.post('/logout', logout);

module.exports = router;