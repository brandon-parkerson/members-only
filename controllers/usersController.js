const db = require("../db/queries");

async function getIndex(req, res) {
    res.render("index");
}

async function createUser(req, res) {
    res.render("index", {created})
}

module.exports = {
    getIndex,
    createUser,
}