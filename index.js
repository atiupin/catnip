var bem = function() {
  console.log('bem!');
}

var cssm = function() {
  console.log('cssm!');
}

module.exports = {
  bem: bem,
  cssm: cssm,
} = bem;