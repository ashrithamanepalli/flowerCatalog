const { getEntries } = require('./parseSearchParams.js');

const displayComments = (request, response) => {
  const { guestBook } = request;
  guestBook.loadComments();
  const mainPage = guestBook.getPage();

  response.end(mainPage);
  return true;
};

const redirectToDisplay = (request, response) => {
  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end('');
};

const getBodyParams = (body) => {
  const searchParams = new URLSearchParams(body);
  const bodyParams = getEntries(searchParams);
  return bodyParams;
};

const addComment = (request, response) => {
  const { guestBook } = request;
  const date = new Date().toLocaleString();

  let body = '';
  request.on('data', (data) => {
    body += data;
  });

  request.on('end', () => {
    const { name, comment } = getBodyParams(body);

    if (name && comment) {
      guestBook.addComment({ date: date, name: name, comment: comment });
      guestBook.storeComments();
    }

    redirectToDisplay(request, response);
  });
};

const guestbookHandler = (request, response, next) => {
  let { pathname } = request.url;

  if (pathname === '/guest-book' && request.method === 'GET') {
    displayComments(request, response);
    return true;
  }

  if (pathname === '/guest-book/add-comment' && request.method === 'POST') {
    addComment(request, response);
    return true;
  }

  next();
};

module.exports = { guestbookHandler };
