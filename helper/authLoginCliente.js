module.exports.checarLogadoCliente = function (req, res, next){
    const userIdCliente = req.session.userIdCliente;
    if(!userIdCliente){
        res.redirect('/login');
    }
    next();
}
