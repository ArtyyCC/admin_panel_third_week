const {writeData, readData} = require("../utils/data");

const sendAllGames = async (request, response, next) => {
    request.games =  await readData("./data/games.json");
    response.send(request.games)
};


const deleteGame = async (response, request, next) => {
    request.games =  await readData("./data/games.json");
    const id = Number(request.params.id);
    request.game = request.games.find((item) => item.id === id);
    const index = request.games.findIndex((item) => item.id === request.game.id);
    request.games.splice(index, 1);
    await writeData("./data/games.json", req.games);
    response.send({
        games: request.games,
        update: request.games
    })
};

const addGameController = async (req, res, next) => {
    req.isNew = !Boolean(req.games.find(item => item.title === req.body.title));
    if (req.isNew) {
        const inArray = req.games.map(item => Number(item.id));
        let maximalId;
        if (inArray.length > 0) {
            maximalId = Math.max(...inArray);
        } else {
            maximalId = 0;
        }
        req.updatedObject = {
            id: maximalId + 1,
            title: req.body.title,
            image: req.body.image,
            link: req.body.link,
            description: req.body.description
        };
        req.games = [...req.games, req.updatedObject];
    } else {
        res.status(400);
        res.send({status: "error", message: "Игра с таким именем уже есть."});
        return
    }
    await writeData("./data/games.json", req.games);
    res.send({
        games: req.games,
        updated: req.updatedObject
    });
};
module.exports = {
    deleteGame,
    sendAllGames,
    addGameController
}