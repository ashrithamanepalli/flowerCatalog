const errorHandler = (request, response) => {
  response.statusCode = 404;
  response.setHeader('Content-type', 'text/plain');
  response.end('uri not found');
  return true;
};

module.exports = { errorHandler };
