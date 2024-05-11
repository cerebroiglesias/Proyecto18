const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { User } = require('../models/loginModel');
const bcrypt = require('bcrypt');

passport.use('login', new localStrategy({
        passReqToCallback: true
    }, 
    async (req, username, password, done) => {
        try{
            const user = await User.findOne({ username: username });
            if (!user) {
                console.log('User not found with username ' + username);
                console.log('message', 'User not found');
                return done(null, false, 'User not found');
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                console.log('message', 'Invalid Password');
                return done(null, false, 'Invalid Password');
            }
            return done(null, user);
        }catch(err){
            return done(err);
        }
    }
))

const isValidPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);
}

passport.use('register', new localStrategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        const findOrCreateUser = async function(){
            try{
                const user = await User.findOne({ username: username })
                if (user) {
                    console.log('User already exists with username: ' + username);
                    console.log('message', 'User already exists');
                    return done(null, false, 'User already exists');
                }
                const newUser = new User();
                newUser.username = username;
                newUser.password = createHash(password);
                const userSaved = await newUser.save()
                console.log('User Registration succesful');
                console.log('message', 'User Registration succesful');
                return done(null, newUser);
            }catch(err){
                console.log('Error in Saving user: '+ err);
                console.log('message', 'Error in Saving user');
                throw err;
            }
        }
        process.nextTick(findOrCreateUser);
    }
));

const createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user)).catch((err) => done(err, null));
})

module.exports = passport