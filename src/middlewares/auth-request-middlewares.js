const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { UserService } = require("../services");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while authenticating user";

    ErrorResponse.error = new AppError(
      ["Email not found in the incoming request "],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while authenticating user";

    ErrorResponse.error = new AppError(
      ["Password not found in the incoming request "],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const isAuthenticated = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (isAuthenticated) {
      req.user = response; //setting user id in the req object
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
}
async function isAdmin(req, res, next) {
  const response = await UserService.isAdmin(req.user);
  if (!response) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User not authorized for this action" });
  }
  next();
}
module.exports = {
  validateAuthRequest,
  checkAuth,
  isAdmin
};
