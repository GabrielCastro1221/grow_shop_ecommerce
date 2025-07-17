const { Router } = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/AuthMiddleware');
const router = Router();

router.post('/create', UserController.createUser);
router.post("/newsletter/subscribe", UserController.subscribeToNewsletter);

router.get('/', UserController.getUsers);
router.get(
    "/profile/me",
    auth.authenticate,
    auth.restrict(["usuario", "admin"]),
    UserController.getUserProfile
);

router.put('/:id', UserController.updateUser);
router.put("/user/:id", UserController.changeRolUser);
router.put("/admin/:id", UserController.changeRolAdmin);

router.delete('/:id', UserController.deleteUser);

module.exports = router;
