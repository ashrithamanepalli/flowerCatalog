const EOL = '\r\n';

const messages = {
  200: 'ok',
  404: 'file not found'
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  setHeaders(header, value) {
    this.#headers[header] = value;
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  #write(body) {
    this.#socket.write(body);
  }

  writeHeaders() {
    Object.entries(this.#headers).forEach(([header, value]) => {
      this.#write(`${header}: ${value}${EOL}`);
    });
  }

  getMessage() {
    return messages[this.#statusCode];
  }

  send(body) {
    this.setHeaders('Content-length', body.length);

    this.#write(`HTTP/1.1 ${this.#statusCode} ${this.getMessage()}${EOL}`);
    this.writeHeaders();
    this.#write(`${EOL}`);
    this.#write(body);
    this.#end();
  }

  #end() {
    this.#socket.end();
  }
}

module.exports = { Response };
