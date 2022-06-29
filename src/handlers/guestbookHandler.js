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
  const existingComments = comments;

  if (name) {
    existingComments.unshift({
      date: date,
      name: name,
      comment: comment
    });

    writeFile(commentsFile, JSON.stringify(existingComments));
  }

  response.statusCode = 302;
  response.setHeader('Location', '/display-comments');
  response.end('');

  return;
};

const basicHandler = (request, response) => {
  let { pathname } = request.url;

  if (pathname === '/guest-book') {
    handleComments(request, response);
    return true;
  }

  if (pathname === '/display-comments') {
    displayComments(request, response);
    return true;
  }

  return false;
};

module.exports = { basicHandler };
