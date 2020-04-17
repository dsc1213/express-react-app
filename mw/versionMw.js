module.exports = (req, res, next) => {
  console.log('>>>>>>>>>>>>>REQ', req, res, process.env.APP_VERSION);
  next();
};
