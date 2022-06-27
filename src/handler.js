const basicHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/Abeliophyllum') {
    console.log('Abeliophyllum');
    return true;
  }

  if (uri === '/Ageratum') {
    console.log('Ageratum');
    return true;
  }
  return false;
};

module.exports = { basicHandler };