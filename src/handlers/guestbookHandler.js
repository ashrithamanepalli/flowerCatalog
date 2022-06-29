const formatComment = (comments) => {
  let stringComments = '';

  comments.forEach(({ date, name, comment }) => {
    const formattedComment =
      `Date : ${date} Name : ${name} Comment : ${comment}`;
    stringComments += `<li>${formattedComment}</li>`;
  })

  return stringComments;
};

const displayComments = (request, response) => {
  const { comments, template } = request;
  const formattedComments = formatComment(comments);

  const commentsTemplate = template;
  const mainPage = commentsTemplate.replace('__COMMENTS__', formattedComments);

  response.end(mainPage);
  return mainPage;
};

const handleComments = (request, response) => {
  const { comments, writeFile, commentsFile } = request;
  const { name, comment } = request.queryParams;

  const date = new Date().toLocaleString();
  // const existingComments = comments;

  if (name && comment) {
    comments.unshift({
      date: date,
      name: name,
      comment: comment
    });

    writeFile(commentsFile, JSON.stringify(comments));
  }

  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end('');

  return;
};

const guestbookHandler = (request, response) => {
  let { pathname } = request.url;

  if (pathname === '/guest-book/add-comment') {
    handleComments(request, response);
    return true;
  }

  if (pathname === '/guest-book') {
    displayComments(request, response);
    return true;
  }

  return false;
};

module.exports = { guestbookHandler };
