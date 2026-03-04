const successResponse = (res, message, data = null, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    errors: null,
  });
};

const errorResponse = (res, status, message, errors = null) => {
  return res.status(status).json({
    success: false,
    message,
    data: null,
    errors,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
