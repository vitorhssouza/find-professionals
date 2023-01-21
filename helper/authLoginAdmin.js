module.exports.checarLogadoAdmin = function (req, res, next){
    const userIdAdmin = req.session.userIdAdmin;
    if(!userIdAdmin){
        res.redirect('/login');
    }
    next();
}