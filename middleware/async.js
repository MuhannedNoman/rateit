module.exports = function asyncMiddleware(handler) {
  return async (req, res, nex) => {
    try {
      await handler(req, res);
    } catch (ex) {
      for (field in ex.errors) console.log(ex.errors[field].message);
      next(ex);
    }
  };
};
