const fetchGravatar = (hash) => {
  const url = `https://www.gravatar.com/avatar/${hash}`;
  return url;
};

export default fetchGravatar;
