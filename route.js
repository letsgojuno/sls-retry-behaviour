const wait = ms => new Promise(res => setTimeout(res, ms));

module.exports.handle = async function(event) {
  console.log('route handler');
  throw new Error('neehh');
  await wait(2000);
  return 123;
};
