var https = require("https");
var utils = require("./utils");
var signer = require("./signer");

module.exports = {
    dark_enhance: function (token, data, brightness, callback) {

        // 构建请求信息和请求参数信息
        var host = "ais.cn-north-1.myhwclouds.com";
        var uri = "/v1.0/vision/dark-enhance";

        var requestData = {"image": data, "brightness": brightness};
        var options = utils.getHttpRequestEntityOptions(host, "POST", uri, {
            "Content-Type": "application/json",
            "X-Auth-Token": token
        });

        var requestBody = JSON.stringify(requestData);

        var request = https.request(options, function (response) {

            // 验证服务调用返回的状态是否成功，如果为200, 为成功, 否则失败。
            if (response.statusCode !== 200) {
                console.log("Process the image dark enhance failed!");
                return;
            }

            var resultStr = "";
            // 拼接返回结果的base64的字符串
            response.on("data", function (chunk) {
                resultStr += chunk.toString();
            });

            response.on("end", function () {
                callback(resultStr);
            })
        });

        request.on("error", function (err) {
            console.log(err.message);
        });

        request.write(requestBody);
        request.end();
    },

    dark_enhance_aksk: function (_ak, _sk, data, brightness, callback) {

        // 配置ak，sk信息
        var sig = new signer.Signer();
        sig.AppKey = _ak;                   // 构建ak
        sig.AppSecret = _sk;                // 构建sk

        var requestData = {"image": data, "brightness": brightness};
        var req = new signer.HttpRequest();
        var options = utils.getHttpRequestEntity(sig, req, "ais.cn-north-1.myhwclouds.com", "POST", "/v1.0/vision/dark-enhance", "", {"Content-Type": "application/json"}, requestData);

        var request = https.request(options, function (response) {

            // 验证服务调用返回的状态是否成功，如果为200, 为成功, 否则失败。
            if (response.statusCode !== 200) {
                console.log("Process the image dark enhance failed!");
                return;
            }

            var resultStr = "";
            // 拼接返回结果的base64的字符串
            response.on("data", function (chunk) {
                resultStr += chunk.toString();
            });

            response.on("end", function () {
                callback(resultStr)
            })
        });

        request.on("error", function (err) {
            console.log(err.message);
        });

        request.write(req.body);
        request.end();
    }
};