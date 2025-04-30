const db = require("../db/queries");

async function getIndex(req, res) {
    res.render("index");
}

async function createUser(req, res) {
    const {first, last, username, password } = req.body;
    console.log(first, last);
    res.render("created", {first, last, username, password})
}

module.exports = {
    getIndex,
    createUser,
}