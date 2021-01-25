module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "LogIn to access this content.");
        res.redirect("/users/login");
    }
}
