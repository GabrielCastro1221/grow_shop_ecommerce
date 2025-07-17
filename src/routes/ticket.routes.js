const { Router } = require('express');
const TicketController = require('../controllers/TicketController');

const router = Router();

router.post("/cart/:cid/finish-purchase", TicketController.finishPurchase);
router.delete("/:id", TicketController.deleteTicket);
router.put("/pay/:id", TicketController.payTicket);
router.put("/cancel/:id", TicketController.cancelTicket);
router.put("/process/:id", TicketController.processTicket);

module.exports = router;
