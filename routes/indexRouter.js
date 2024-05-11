const express = require('express');
const passport = require('../middleware/passport');

const router = express.Router();

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        res.render('index', { 
            username : req.user.username,
            title: 'Home Page',
        });
    }else{
        res.redirect('/login');    
    }
})

router.get('/login', function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect("/");
    }else{
        res.render('login', { title: 'Ingreso de usuarios' });    
    }
});

router.post('/login', passport.authenticate('login', { failWithError: true }, function(err, user, info) {
    if (err) { 
        return err; 
    }else if(!user){
        return info;
    }
 }), function(req, res, next) {
    res.redirect('/');
});

router.get('/registrar', function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect("/");
    }else{
        res.render('register', { title: 'Creación de usuarios' });
    }
});

router.post('/registrar', function(req, res, next) {
    passport.authenticate('register', function(err, user, info) {
        if (err) { 
            res.render('register', { error: err });
            return next(err); 
        }
        if (!user) {
            res.render('register', { error: info });
        }
        if(user){
            res.redirect('/');
        }
    })(req, res, next);
});

router.get('/logout', function(req, res, next) {
    let username = req.user.username;
    req.logout();
    res.render("logout", { username: username });
})

module.exports = router;