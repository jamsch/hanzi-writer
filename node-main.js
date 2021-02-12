/* eslint-env node */
module.exports =
  process.env.NODE_ENV === 'production'
    ? require('./umd/hanzi-writer.production.min.js')
    : require('./umd/hanzi-writer.development.js');
