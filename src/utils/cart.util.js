const { v4: uuidv4 } = require("uuid");

const ticketNumberRandom = () => {
    const cod = uuidv4();
    return cod;
};

module.exports = { ticketNumberRandom };
