const parseUri = (rawUri) => {
  const queryParams = {};
  const [uri, queryString] = rawUri.split('?');
  if (queryString) {
    const params = queryString.split('&');
    params.forEach((paramString) => {
      const [param, value] = paramString.split('=');
      queryParams[param] = value;
    })
  }
  return { uri, ...queryParams };
};

const parseRequestLine = (line) => {
  const [method, rawUri, httpVersion] = line.split(' ');
  return { method, ...parseUri(rawUri), httpVersion };
};

const parseRequest = (header) => {
  const separatorIndex = header.indexOf(':');
  const key = header.slice(0, separatorIndex);
  const value = header.slice(separatorIndex + 1);
  return [key, value];
};

const parseHeaderLines = (lines) => {
  let index = 0;
  const headers = {};
  while (index < lines.length && lines[index].length > 0) {
    const [key, value] = parseRequest(lines[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};

module.exports = {
  parseHeaderLines,
  parseRequest,
  parseRequestLine
};
