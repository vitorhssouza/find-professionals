module.exports.checarLogadoPrestador = function (req, res, next){
    const userIdPrestador = req.session.userIdPrestador;
    if(!userIdCliente){
        res.redirect('/login');
    }
    next();
}