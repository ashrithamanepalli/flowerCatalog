const getEntries = (searchParams) => {
  const queryParams = {};
  const entries = searchParams.entries();

  for (const [query, value] of entries) {
    queryParams[query] = value;
  }
  return queryParams;
};

const parseSearchParams = (req, res) => {
  req.url = new URL(`http://${req.headers.host}` + req.url);
  req.queryParams = getEntries(req.url.searchParams);

  return false;
};

module.exports = { parseSearchParams };
