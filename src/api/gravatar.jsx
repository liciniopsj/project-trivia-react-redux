import md5 from 'crypto-js/md5';

const createGravatarImage = (email) => {
  const hashGerada = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hashGerada}`;
};

export default createGravatarImage;
