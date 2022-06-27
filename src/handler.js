const basicHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/Abeliophyllum') {
    response.send('Abeliophyllum');
    return true;
  }

  if (uri === '/Ageratum') {
    response.send('Ageratum');
    return true;
  }
  return false;
};

module.exports = { basicHandler };