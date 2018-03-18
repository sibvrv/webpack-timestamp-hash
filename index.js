/**
 * Convertion ToBase62
 * Converts the value of the specified number to duosexagesimal format.
 * @param {number} a Input Value
 * @returns {string}
 */
function toBase62(a, b, c) {
  for (a = a !== +a || a % 1 ? -1 : a, b = ''; a >= 0; a = Math.floor(a / 62) || -1) b = String.fromCharCode(((c = a % 62) > 9 ? c > 35 ? 29 : 87 : 48) + c) + b;
  return b;
}

/**
 * Webpack Plugin
 */
module.exports = class {
  /**
   * Constructor
   * 
   * options:
   *   hash - custom hash
   * 
   * @param {*} options 
   */
  constructor(options) {
    this.options = { ...options };
  }

  /**
   * Apply hash
   * @param {*} compiler 
   */
  apply(compiler) {
    const options = this.options;
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('after-hash', function () {
        compilation.hash = options.hash || toBase62(Math.floor(+(new Date()) / 1000));
      });
    });
  }
};
