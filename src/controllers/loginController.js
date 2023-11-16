const Login = require('../models/loginModel');

exports.index = (req, res) => {
    console.log(req.session.user);
    res.render('login');
}

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }    

        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save(function() {
            return res.redirect('/login/index');
        });
    } catch (error) {
        console.log(error)
        return res.render('404');
    }
}

exports.login = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }    

        req.flash('success', 'Você entrou no sistema.');
        req.session.user = login.user;
        req.session.save(function() {
            return res.render('/login/index');
        });
    } catch (error) {
        console.log(error)
        return res.render('404');
    }
}

