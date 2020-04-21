module.exports = (_req, res, next) => {
  // res._end: true means there was a successfull req->res
  if (res._end) {
    // add here logic to a common action after routes
    return;
  }

  // otherwise none of the routes matched then treat this as 404 request
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};
