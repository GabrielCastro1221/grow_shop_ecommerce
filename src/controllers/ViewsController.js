const { logger } = require('../middlewares/logger.middleware');

class ViewsController {
    renderIndex(req, res) {
        try {
            res.render('index');
        } catch (error) {
            logger.error(`Error occurred while rendering index view: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ViewsController();