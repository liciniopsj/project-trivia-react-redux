const fetchGravatar = async (hash) => {
  try {
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  } catch (e) {
    return '';
  }
};

export default fetchGravatar;
