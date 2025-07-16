const { Router } = require('express');
const viewsController = require('../controllers/ViewsController');

const router = Router();

router.get('/', viewsController.renderIndex);

module.exports = router;
