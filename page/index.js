var $ = require('jquery');
var alert = require('libs/alert');

module.exports = function(selector) {
  $(selector).on('click', function() {
    alert('~Duang 的一下，我就弹出来了。');
    return false;
  });
};
