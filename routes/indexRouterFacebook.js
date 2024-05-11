const express = require('express');
const passport = require('../middleware/passport');

const router = express.Router();

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        res.render('indexFacebook', { 
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
            email: req.user.emails[0].value,
        });
    }else{
        res.redirect('/login');    
    }
})

router.get('/login', function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect("/");
    }else{
        res.render('loginFacebook', { title: 'Ingreso de usuarios', error: req.session.error });    
    }
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect("/");
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), function(req, res, next) {
    res.redirect('/');
});

router.get('/faillogin', function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect("/");
    }else{
        res.render('loginFacebook', { title: 'Ingreso de usuarios', error: 'Error de inicio de sesion' });    
    }
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