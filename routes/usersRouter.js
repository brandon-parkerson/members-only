const Router = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.getIndex);
usersRouter.post("/", usersController.createUser)

module.exports = usersRouter;

