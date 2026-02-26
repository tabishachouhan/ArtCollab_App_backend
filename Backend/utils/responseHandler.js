export const successResponse = (res, status, message, data = null) => {
  res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, status, message) => {
  res.status(status).json({
    success: false,
    message,
  });
};