const basicHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/downloadAbeliophyllum') {
    response.send('Abeliophyllum');
    return true;
  }

  if (uri === '/downloadAgeratum') {
    response.send('Ageratum');
    return true;
  }
  return false;
};

module.exports = { basicHandler };