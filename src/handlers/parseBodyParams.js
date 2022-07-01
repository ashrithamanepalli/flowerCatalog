const { getEntries } = require('./parseSearchParams');

const parseBodyParams = (req, res, next) => {
  if (req.method === 'POST') {
    let body = '';

    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const searchParams = new URLSearchParams(body);
      req.bodyParams = getEntries(searchParams);
      next();
    });
    return;
  };

  next();
};

module.exports = { parseBodyParams };
