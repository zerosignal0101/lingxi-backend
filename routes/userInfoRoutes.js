var express = require('express');
var connection = require('../tool/db');
var xlsx = require('xlsx');
var { successResponse, errorResponse } = require('../handler/responseHandler');

var router = express.Router();
/**
 * @swagger
 * /userInfo:
 *   post:
 *     tags:
 *       - UserInfo
 *     description: 学生注册
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *                description: 登录名
 *              userStudentId:
 *                type: string
 *                description: 学号
 *     responses:
 *       200:
 *         description: 注册成功，返回成功信息
 *       500:
 *         description: 注册失败，返回错误信息
 */
router.post('/', function (req, res) {
    // 读取 Excel 文件
    var workbook = xlsx.readFile('./static/studentInfo.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var studentInfoList = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    // 检查用户信息是否在 Excel 文件中
    var userInExcel = studentInfoList.some(function (studentInfo) {
        return studentInfo["姓名"] === req.body.userName && studentInfo["学号"] === req.body.userStudentId;
    });
    if (!userInExcel) {
        res.json(errorResponse("学生不存在，注册失败!"));
    } else {
        // 检查用户是否已经在数据库中
        var query = `SELECT * FROM UserInfo WHERE userName="${req.body.userName}" AND userStudentId="${req.body.userStudentId}"`;
        connection.query(query, function (err, result) {
            if (err) return res.json(errorResponse("Error: " + err));
            if (result.length > 0) {
                res.json(errorResponse("用户已注册!"));
            } else {
                var insertQuery = `INSERT INTO UserInfo (userName, userStudentId, creditScore) VALUES ("${req.body.userName}", "${req.body.userStudentId}", 0)`;
                connection.query(insertQuery, function (err) {
                    if (err) return res.json(errorResponse("Error: " + err));
                    res.json(successResponse("用户成功注册!"));
                });
            }
        });
    }
});

/**
 * @swagger
 * /userinfo/{userId}:
 *   get:
 *     tags:
 *       - UserInfo
 *     description: 查询用户信息
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: 用户ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 查询成功，返回用户信息
 *       500:
 *         description: 查询失败，返回错误信息
 */
router.get('/:userId', function (req, res) {
    var query = `SELECT * FROM UserInfo WHERE UserId="${req.params.userId}"`;
    connection.query(query, function (err, result) {
        if (err) return res.json(errorResponse("Error: " + err));
        res.json(successResponse(result));
    });
});

module.exports = router;