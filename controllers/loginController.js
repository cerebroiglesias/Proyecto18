const model = require('../models/loginModel');


const getAll = async (req, res) => {
    model.getAll().then(data => res.send(data)).catch(err => res.send(err));
}

const login = async (req, res) => {
    model.getAll().then(data => res.send(data)).catch(err => res.send(err));
}

const create = async (req, res) => {
    const { nombre, password } = req.body;
    model.create(nombre, password).then(data => res.send(data)).catch(err => res.send(err));
}

const update = async (req, res) => {
    const { nombre, password } = req.body;
    model.update(nombre, password).then(data => res.send(data)).catch(err => res.send(err));
}

const erase = async (req, res) => {
    const { nombre } = req.body;
    model.erase(nombre).then(data => res.send(data)).catch(err => res.send(err));
}

export default {
    getAll,
    create,
    update,
    erase
}