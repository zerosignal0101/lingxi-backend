// 封装成功的响应 分页数据
const successListResponse = (data = null, totalCount = null) => {
    return { totalCount: totalCount, code: 200, data: data };
}

// 封装成功的响应 普通请求
const successResponse = (data = null) => {
    return { code: 200, msg: "", data: data };
}

// 封装失败的响应
const errorResponse = (errMsg) => {
    return { code: 500, msg: errMsg };
}

module.exports = { successResponse, errorResponse, successListResponse };