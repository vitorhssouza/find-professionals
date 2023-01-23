module.exports.checarLogadoCliente = function (req, res, next){
    const userIdCliente = req.session.userIdCliente;
    if(userIdCliente == null){
        res.redirect('/login');
    }else{
        next();
    }
    
}

