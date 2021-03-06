<?php
require "signer.php";

/**
 * token 方式
 */
function image_content($token, $data, $url, $categories, $threshold)
{

    // 构建请求信息
    $_url = "https://ais.cn-north-1.myhuaweicloud.com/v1.0/moderation/image";

    $data = array(
        "image" => $data,                      // 与url二选一 图片文件Base64编码字符串
        "url" => $url,                         // 与image二选一 图片的URL路径
        "categories" => $categories,           // 非必选 结果过滤门限
        "threshold" => $threshold,             // 非必选 检测场景 array politics：是否涉及政治人物的检测。terrorism：是否包含暴恐元素的检测。porn：是否包含涉黄内容元素的检测
    );

    $curl = curl_init();
    $headers = array(
        "Content-Type:application/json",
        "X-Auth-Token:" . $token);

    // 请求信息封装
    curl_setopt($curl, CURLOPT_URL, $_url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curl, CURLOPT_NOBODY, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    // 执行请求信息
    $response = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if ($status == 0) {
        echo curl_error($curl);
    } else {

        // 验证服务调用返回的状态是否成功，如果为200, 为成功, 否则失败。
        if ($status == 200) {
            return $response;
        } else {
            return "Process the image content by token result failed!";
        }
        echo $status . "\n";
        echo $response;
    }
    curl_close($curl);


}

/**
 * ak,sk 方式
 */
function image_content_aksk($_ak, $_sk, $data, $url, $categories, $threshold)
{
    // 构建ak，sk对象
    $signer = new Signer();
    $signer->AppKey = $_ak;             // 构建ak
    $signer->AppSecret = $_sk;          // 构建sk

    // 构建请求对象
    $req = new Request();
    $req->method = "POST";
    $req->scheme = "https";
    $req->host = "ais.cn-north-1.myhuaweicloud.com";
    $req->uri = "/v1.0/moderation/image";

    $data = array(
        "image" => $data,                      // 与url二选一 图片文件Base64编码字符串
        "url" => $url,                         // 与image二选一 图片的URL路径
        "categories" => $categories,           // 非必选 结果过滤门限
        "threshold" => $threshold,             // 非必选 检测场景 array politics：是否涉及政治人物的检测。terrorism：是否包含暴恐元素的检测。porn：是否包含涉黄内容元素的检测
    );

    $headers = array(
        "Content-Type" => "application/json",
    );

    $req->headers = $headers;
    $req->body = json_encode($data);

    // 获取ak，sk方式的请求对象，执行请求
    $curl = $signer->Sign($req);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if ($status == 0) {
        echo curl_error($curl);
    } else {

        // 验证服务调用返回的状态是否成功，如果为200, 为成功, 否则失败。
        if ($status == 200) {
            return $response;
        } else {

            echo $status . "\n";
            echo $response;
            return "Process the image content by ak,sk result failed!";
        }

    }
    curl_close($curl);
}
