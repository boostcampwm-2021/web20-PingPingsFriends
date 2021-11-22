interface QueryStringMap {
  [key: string]: string;
}

const queryString = (querystring: string) => {
  const map: QueryStringMap = {};

  querystring.replace(/[?&]+([^=&]+)=([^&]*)/gi, (substring: string, key: string, value: string) => {
    map[key] = value;
    return '';
  });

  return map;
};

export default queryString;
