class GuestBook {
  #commentsPath;
  #templatePath;
  #readFile;
  #writeFile;
  #comments;

  constructor(commentsPath, templatePath, writeFile, readFile) {
    this.#commentsPath = commentsPath;
    this.#templatePath = templatePath;
    this.#writeFile = writeFile;
    this.#readFile = readFile;
    this.#comments = [];
  }

  addComment(comment) {
    this.#comments.unshift(comment);
  }

  loadComments() {
    this.#comments = JSON.parse(this.#readFile(this.#commentsPath)) || [];
  }

  storeComments() {
    this.#writeFile(this.#commentsPath, JSON.stringify(this.#comments));
  }

  #formatComments() {
    let stringComments = '';

    this.#comments.forEach(({ date, name, comment }) => {
      const formattedComment =
        `Date : ${date} Name : ${name} Comment : ${comment}`;
      stringComments += `<li>${formattedComment}</li>`;
    })

    return stringComments;
  };

  getPage() {
    const formattedComments = this.#formatComments();
    const template = this.#readFile(this.#templatePath);
    const page = template.replace('__COMMENTS__', formattedComments);
    return page;
  }

};

module.exports = { GuestBook };
