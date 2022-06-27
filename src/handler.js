const fs = require('fs');

const formatComment = ({ date, name, comment }) => {
  let stringComments = '';
  const parsedComments = comment.replace('+', ' ');
  const formattedComment =
    `Date : ${date} Name : ${name} Comment : ${parsedComments}`;
  stringComments += `<li>${formattedComment}</li>`;

  return stringComments;
};

const displayComments = (comments, request, response) => {
  const formattedComments = comments.map(formatComment).join('');

  const template = request.template;
  const mainPage = template.replace('__COMMENTS__', formattedComments);
  fs.writeFileSync('./public/guestBook.html', mainPage, 'utf-8');

  response.send(mainPage);
};

const storeComments = (request, response) => {
  const date = new Date().toLocaleString();

  const existingComments = request.comments;

  existingComments.unshift({
    date: date,
    name: request.name,
    comment: request.comment
  });

  displayComments(existingComments, request, response);
  fs.writeFileSync('./public/comments.json', JSON.stringify(existingComments));

  return;
};

const basicHandler = (request, response) => {
  let { uri } = request;

  if (uri === '/store-comment') {
    storeComments(request, response);
    return true;
  }

  return false;
};

module.exports = { basicHandler };
