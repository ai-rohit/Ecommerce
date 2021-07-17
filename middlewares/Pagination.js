function paginateResult(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResult = {};
    if (startIndex > 0) {
      paginatedResult.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    if (endIndex < (await model.countDocuments().exec())) {
      paginatedResult.next = {
        page: page + 1,
        limit: limit,
      };
    }
    paginatedResult.result = await model.find().limit(limit).skip(startIndex);
    req.paginatedResult = paginatedResult;
    next();
  };
}

module.exports.paginatingFunc = paginateResult;
