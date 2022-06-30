const displayComments = (request, response) => {
  const { guestBook } = request;
  guestBook.loadComments();
  const mainPage = guestBook.getPage();

  response.end(mainPage);
  return true;
};

const handleComments = (request, response) => {
  const { guestBook } = request;
  const { name, comment } = request.queryParams;

  const date = new Date().toLocaleString();

  if (name && comment) {
    guestBook.addComment({ date: date, name: name, comment: comment });
    guestBook.storeComments();
  }

  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end('');

  return true;
};

const guestbookHandler = (request, response) => {
  let { pathname } = request.url;

  if (pathname === '/guest-book') {
    displayComments(request, response);
    return true;
  }

  if (pathname === '/guest-book/add-comment') {
    handleComments(request, response);
    return true;
  }

  return false;
};

module.exports = { guestbookHandler };
