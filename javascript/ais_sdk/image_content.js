var https = require("https");
var utils = require("./utils");
var signer = require("./signer");

module.exports = {
    image_content: function (token, data, url, categories, threshold, callback) {

        // 构建请求信息和请求参数信息
        var host = "ais.cn-north-1.myhwclouds.com";
        var uri = "/v1.0/moderation/image";
        /**
         * image: 与url二选一 图片文件Base64编码字符串
         * url：与image二选一 图片的URL路径
         * threshold：非必选 结果过滤门限
         * categories：非必选 检测场景 array politics：是否涉及政治人物的检测。terrorism：是否包含暴恐元素的检测。porn：是否包含涉黄内容元素的检测。
         * @type {string}
         */
        var requestData = {"image": data, url: url, "categories": categories, "threshold": threshold};

        var options = utils.getHttpRequestEntityOptions(host, "POST", uri, {
            "Content-Type": "application/json",
            "X-Auth-Token": token
        });
        var requestBody = JSON.stringify(requestData);

        var request = https.request(options, function (response) {

            // 验证服务调用返回的状态是否成功，如果为200, 为成功, 否则失败。
            if (response.statusCode !== 200) {
                console.log("Process the image content result failed!");
                return;
            }

            // 返回图像内容检测服务结果
            response.on("data", function (chunk) {
                callback(chunk.toString());
            })
        });

        request.on("error", function (err) {
            console.log(err.message);
        });
        request.write(requestBody);
        request.end();
    },

    image_content_aksk: function (_ak, _sk, data, url, categories, threshold, callback) {

        // 配置ak，sk信息
        var sig = new signer.Signer();
        sig.AppKey = _ak;                   // 构建ak
        sig.AppSecret = _sk;                // 构建sk

        // 构建请求信息和请求参数信息
        /**
         *  image : 与url二选一 图片文件Base64编码字符串
         *  url ： 与image二选一 图片的URL路径
         *  threshold ：非必选 结果过滤门限
         *  categories ：非必选 检测场景 array politics：是否涉及政治人物的检测。terrorism：是否包含暴恐元素的检测。porn：是否包含涉黄内容元素的检测。
         * @type {string}
         */
        var requestData = {"image": data, url: url, "categories": categories, "threshold": threshold};
        var req = new signer.HttpRequest();
        var options = utils.getHttpRequestEntity(sig, req, "ais.cn-north-1.myhwclouds.com", "POST", "/v1.0/moderation/image", "", {"Content-Type": "application/json"}, requestData);

        var request = https.request(options, function (response) {

            // 验证服务调用返回的状态是否成功，如果为200, 为成功, 否则失败。
            if (response.statusCode !== 200) {
                console.log("Process the image content result failed!");
                return;
            }

            // 返回图像内容检测服务结果信息
            response.on("data", function (chunk) {
                callback(chunk.toString());
            })
        });

        request.on("error", function (err) {
            console.log(err.message);
        });

        request.write(req.body);
        request.end();
    }

};