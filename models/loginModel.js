const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model('users', userSchema);

const getAll = async () => {
    return await User.find({}).exec();
}

const create = async (username, password) => {
    const User = new Usuario({
        username: username,
        password: password
    })
    return await User.save();
}

const update = async (username, password) => {
    return await User.updateOne({username: username}, {$set: {edad: password}})
}

const erase = async (username) => {
    return await User.deleteOne({username: username});
}

module.exports = {
    User,
    getAll,
    create,
    update,
    erase
}