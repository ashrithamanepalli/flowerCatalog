const getEntries = (searchParams) => {
  const queryParams = {};
  const entries = searchParams.entries();

  for (const [query, value] of entries) {
    queryParams[query] = value;
  }
  return queryParams;
};

const parseSearchParams = (req, res, next) => {
  req.url = new URL(`http://${req.headers.host}` + req.url);
  req.queryParams = getEntries(req.url.searchParams);

  next();
};

module.exports = { parseSearchParams, getEntries };
