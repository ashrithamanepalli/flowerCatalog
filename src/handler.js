const fs = require('fs');

const formatComment = ({ date, name, comment }) => {
  let stringComments = '';
  const parsedComments = comment.replace('+', ' ');
  const formattedComment =
    `Date : ${date} Name : ${name} Comment : ${parsedComments}`;
  stringComments += `<li>${formattedComment}</li>`;

  return stringComments;
};

const displayComments = (comments, response) => {
  const formattedComments = comments.map(formatComment).join('');

  const template = fs.readFileSync('./public/guestBookTemplate.html', 'utf-8');
  const mainPage = template.replace('__COMMENTS__', formattedComments);
  fs.writeFileSync('./public/guestBook.html', mainPage, 'utf-8');

  response.send(mainPage);
};

const storeComments = (request, response) => {
  const date = new Date().toLocaleString();

  const existingComments = JSON.parse(
    fs.readFileSync('./public/comments.json', 'utf-8'));

  existingComments.unshift({
    date: date,
    name: request.name,
    comment: request.comment
  });

  displayComments(existingComments, response);
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
