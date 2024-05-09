const { errorResponse } = require('./responseHandler');

function errorHandler(err, req, res, next) {
    console.error(err.stack); // 打印出错误的堆栈
    res.json(errorResponse(err.message)); // 发送一个错误的响应
}

module.exports = errorHandler;