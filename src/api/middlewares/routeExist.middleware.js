const codeInfo = new (require("../../../md/app.info"))().middleware;
const STATUS = require("../../utils/constants/status.constants");
const CustomError = require("../../utils/error.utils");

/****************************/
/******** Learn More ********/
/**/ codeInfo.routeExist  /**/
/****************************/
const routeExist = (req, res, next) => {
  const method = `[${req.method}]`;
  const message = `The route ${req.originalUrl} with method ${method} was not implemented`;
  if(req.originalUrl) throw new CustomError(STATUS.NOT_FOUND, message)
  next();
};

module.exports = routeExist;