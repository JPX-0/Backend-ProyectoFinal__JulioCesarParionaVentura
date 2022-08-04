const codeInfo = new (require("../../../md/app.info"))().middleware;

/**********************/
/***** Learn More *****/
/**/ codeInfo.auth  /**/
/**********************/
const auth = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  res.redirect('/');
};

module.exports = auth;