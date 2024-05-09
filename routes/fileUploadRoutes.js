var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './upload/' + new Date().toISOString().slice(0,10);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true});
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

/**
 * @swagger
 * /upload:
 *   post:
 *     tags:
 *       - FileUpload
 *     summary: 上传图片
 *     description: 上传图片
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: image
 *         description: 图片文件
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: 上传成功
 *       500:
 *         description: 上传失败
 */
router.post('/upload', upload.single('image'), function (req, res) {
    if (req.file) {
        res.send({path: req.file.path});
    } else {
        res.status(500).send('Upload failed.');
    }
});

module.exports = router;