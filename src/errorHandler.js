const errorHandler = (request, response) => {
  response.statusCode = 404;
  response.send('uri not found');
  return true;
};

module.exports = { errorHandler };
