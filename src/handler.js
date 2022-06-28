const fs = require('fs');

const formatComment = ({ date, name, comment }) => {
  let stringComments = '';

  const formattedComment = `Date : ${date} Name : ${name} Comment : ${comment}`;

  stringComments += `<li>${formattedComment}</li>`;
  return stringComments;
};

const displayComments = (comments, request, response) => {
  const formattedComments = comments.map(formatComment).join('');

  const template = request.template;
  const mainPage = template.replace('__COMMENTS__', formattedComments);

  return mainPage;
};

const handleComments = (request, response) => {
  const date = new Date().toLocaleString();

  const existingComments = request.comments;

  if (request.name) {
    existingComments.unshift({
      date: date,
      name: request.name,
      comment: request.comment
    });
  }

  const mainPage = displayComments(existingComments, request, response);
  fs.writeFileSync('./public/comments.json', JSON.stringify(existingComments));

  response.setHeaders('Content-type', 'text/html')
  response.send(mainPage);

  return;
};

const basicHandler = (request, response) => {
  let { uri } = request;

  if (uri === '/guest-book') {
    handleComments(request, response);
    return true;
  }

  return false;
};

module.exports = { basicHandler };
