const fs = require('fs');

const displayComments = (response) => {
  let stringComments = '';
  const comments = JSON.parse(
    fs.readFileSync('./public/comments.json', 'utf-8'));
  comments.forEach(({ date, name, comment }) => {
    const parsedComments = comment.replace('+', ' ');
    stringComments +=
      `Date : ${date} Name : ${name} Comment : ${parsedComments}\n`
  });

  response.send(stringComments);
};

const storeComments = (request) => {
  const date = new Date;

  const existingComments = JSON.parse(
    fs.readFileSync('./public/comments.json', 'utf-8'));
  existingComments.unshift(
    { date: date, name: request.name, comment: request.comment });

  fs.writeFileSync('./public/comments.json', JSON.stringify(existingComments));
  return;
}

const basicHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/store-comment') {
    storeComments(request);
    displayComments(response);
    return true;
  }
  return false;
};

module.exports = { basicHandler };
