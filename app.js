var express = require('express');
var bodyParser = require('body-parser');

var postInfoRoutes = require('./routes/postInfoRoutes');
var userInfoRoutes = require('./routes/userInfoRoutes');
//swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// 引入日志模块
const { logger, errorLogger } = require('./tool/logger');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '交友app',
            version: '1.0.0',
            description: '交友app api',
        },
        servers: [{
            url: 'http://localhost:3000',
        }],
    },
    apis: ['./routes/*.js'],
};
var fileUploadRoutes = require('./routes/fileUploadRoutes');

var app = express();
app.use('/', fileUploadRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 添加一个中间件，该中间件会记录每个请求的请求参数和返回值
app.use((req, res, next) => {
    const oldJson = res.json;

    res.json = function (data) {
        logger.info(`Request URL: ${req.originalUrl}, Request Params: ${JSON.stringify(req.body)}, Response: ${JSON.stringify(data)}`);
        oldJson.apply(res, arguments);
    };
    next();
});

app.use('/postInfo', postInfoRoutes);
app.use('/userInfo', userInfoRoutes);

// 加载错误处理中间件
const errorHandler = require('./handler/errorHandler');
app.use((err, req, res, next) => {
    errorLogger.error(`Message: ${err.message}, Stack: ${err.stack}`);
    errorHandler(err, req, res, next);
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});