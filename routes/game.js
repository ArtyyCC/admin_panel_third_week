const gamesRouter = require("express").Router();
const {deleteGame, sendAllGames, addGameController} = require('../controllers/games')
const {getAllGames} = require("../middlewares/games")

gamesRouter.get("/games",getAllGames, sendAllGames);
gamesRouter.delete("/games",getAllGames, deleteGame);
gamesRouter.post("/games",getAllGames, addGameController)

module.exports = gamesRouter;

