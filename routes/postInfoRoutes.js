var express = require('express');
var connection = require('../tool/db');
var { successResponse, errorResponse, successListResponse } = require('../handler/responseHandler');
var router = express.Router();

/**
 * @swagger
 * /postInfo:
 *  post:
 *    tags:
 *      - PostInfo
 *    summary: 创建帖子
 *    description: 创建帖子
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              latitude:
 *                type: number
 *                format: float
 *                description: 维度
 *              longitude:
 *                type: number
 *                format: float
 *                description: 经度
 *              content:
 *                type: string
 *                description: 帖子内容
 *              postingTime:
 *                type: string
 *                format: date-time
 *                description: 发帖时间
 *              tags:
 *                type: string
 *                description: 帖子标签
 *              title:
 *                type: string
 *                description: 帖子标题
 *              anthorName:
 *                type: string
 *                description: 作者名称
 *              image:
 *                type: string
 *                description: 帖子图片
 *              name:
 *                type: string
 *                description: 发帖者姓名
 *              phone:
 *                type: string
 *                description: 发帖者手机
 *              address:
 *                type: string
 *                description: 发帖者地址
 *              createUserId:
 *                type: integer
 *                description: 创建用户Id
 *    responses:
 *      '200':
 *        description: 创建成功
 *      '500':
 *        description: 创建失败
 */
router.post('/', function (req, res) {
    var query = `INSERT INTO PostInfo (latitude, longitude, content, postingTime, tags, title, anthorName, image, name, phone, address, createUserId) VALUES ("${req.body.latitude}", "${req.body.longitude}", "${req.body.content}", "${req.body.postingTime}", "${req.body.tags}", "${req.body.title}", "${req.body.anthorName}", "${req.body.image}", "${req.body.name}", "${req.body.phone}", "${req.body.address}", "${req.body.createUserId}")`;
    connection.query(query, function (err) {
        if (err) return res.json(errorResponse("Error: " + err));
        res.json(successResponse("创建帖子成功!"));
    });
});

/**
 * @swagger
 * /postInfo/{postId}:
 *   delete:
 *     tags:
 *       - PostInfo
 *     summary: 删除帖子
 *     description: 删除帖子
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         description: 帖子ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 删除成功，返回成功信息
 *       500:
 *         description: 删除失败，返回错误信息
 */
router.delete('/:postId', function (req, res) {
    var query = `DELETE FROM PostInfo WHERE PostId = ${req.params.postId}`;
    connection.query(query, function (err) {
        if (err) return res.json(errorResponse("Error: " + err));
        res.json(successResponse("删除帖子成功!"));
    });
});

/**
 * @swagger
 * /postInfo:
 *   get:
 *     tags:
 *       - PostInfo
 *     summary: 获取分页帖子列表
 *     description: 获取分页帖子列表
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pageNo
 *         description: 页码
 *         in: query
 *         required: true
 *         type: integer
 *       - name: pageSize
 *         description: 每页数量
 *         in: query
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 获取成功，返回分页帖子列表
 *       500:
 *         description: 获取失败，返回错误信息
 */
router.get('/', function (req, res) {
    // 获取请求参数
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = parseInt(req.query.pageSize);

    // 保证页码不小于1
    pageNo = Math.max(1, pageNo);

    // 转换为 SQL 查询中的 OFFSET 和 LIMIT
    var offset = (pageNo - 1) * pageSize;
    var limit = pageSize;

    // 构建查询帖子总数的语句
    var countQuery = 'SELECT COUNT(*) FROM PostInfo a left join UserInfo b on a.createUserId=b.userId where b.creditScore>3';

    connection.query(countQuery, function (err, countResult) {
        if (err) return res.json(errorResponse("Error: " + err));

        // 构建分页查询语句
        var query = `SELECT a.* FROM PostInfo a left join UserInfo b on a.createUserId=b.userId where b.creditScore>3 ORDER BY postId DESC LIMIT ${limit} OFFSET ${offset}`;

        connection.query(query, function (err, result) {
            if (err) return res.json(errorResponse("Error: " + err));
            res.json(successListResponse(result, countResult[0]['COUNT(*)']));
        });
    });
});

module.exports = router;