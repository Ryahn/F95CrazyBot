const crypt = require("crypto");

module.exports = {
  /**
   *
   * @param {number} len How long to set character length
   * @returns alphanumeric string
   */
  random: function random(len) {
    len = len || 64;
    return crypt.randomBytes(len).toString("hex");
  },

  randomString: function (size = 21) {  
    return crypt
      .randomBytes(size)
      .toString('base64')
      .slice(0, size)
  },


  shortid: function shortid() {
    let str = Buffer.from(crypt.randomUUID()).toString('base64');
    let n = 12;

    return (str.length > n) ? str.substr(0, n-1) : str
  },

  truncate: function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) : str;
  },

  randomNum: function(len1) {
    const len2 = len1 || 17;
    const { customAlphabet } = require('nanoid')
    const nanoid = customAlphabet('1234567890', len2)
    return nanoid();
  },
};
