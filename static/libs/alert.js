require('bootstrap');
var modalTplFn = __inline('./_alert.tmpl');
var $ = require('jquery');

// errorLevel 至少支持 danger、info、sucess、warning
var alert = module.exports = function(content, errorLevel, title) {
    var dom = $(modalTplFn({
        title: title || '提示信息',
        content: content,
        errorLevel: errorLevel || 'info'
    }));

    dom
        .appendTo('body')
        .modal({
            backdrop: 'static'
        })
        .on('hide.bs.modal', function() {
            dom.remove();
        });
};
