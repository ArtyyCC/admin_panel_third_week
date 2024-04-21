const PORT = require("../config")


const allowedCors = [
    'https://practicum.yandex.ru',
    'https://students-projects.ru',
    `localhost:${PORT}`
];

const cors = (req, res, next) => {
    const {origin} = req.headers;

    if (allowedCors.includes(origin)) {
        // res.header('Access-Control-Allow-Origin', '*'); To ignore the clean slate
        res.header('Access-Control-Allow-Origin', origin);
    }

    next();
}

module.exports = {
    cors
}